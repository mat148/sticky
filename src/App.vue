<template>
  <div id="app">
    {{this.$store.state.fingerPrint}}
    <div class="stickyBoard">
      <sticky-note v-for="sticky in this.$store.state.stickyNotes" :key="sticky._id" :note="sticky"></sticky-note>
    </div>

    <create-sticky-modal></create-sticky-modal>
    <cookie-yes-modal></cookie-yes-modal>
    <cookie-no-modal></cookie-no-modal>
    <data-connection-issue-modal></data-connection-issue-modal>
  </div>
</template>

<script>
  import Vue from 'vue';
  import 'es6-promise/auto';
  import { store } from './store/store';
  import stickyNote from './components/stickyNote.vue';
  import modal from './components/modal-template.vue';
  import createStickyModal from './components/createStickyModal.vue';
  import cookieYesModal from './components/cookieYesModal.vue';
  import cookieNoModal from './components/cookieNoModal.vue';
  import dataConnectionIssueModal from './components/dataConnectionIssueModal.vue';
  import fingerPrintMixin from './mixins/fingerPrintMixin';
  import dataHandlingMixin from './mixins/dataHandlingMixin';

  Vue.component('modal', modal);
  Vue.mixin(dataHandlingMixin);
  Vue.mixin(fingerPrintMixin);

  export default {
    name: 'App',
    store: store,
    components: {
      stickyNote,
      createStickyModal,
      cookieYesModal,
      cookieNoModal,
      dataConnectionIssueModal
    },
    async created() {
      this.checkLocalCookies();
      this.getAllStickyNotes();

      /*const self = this;
      setInterval(function(){
        self.getAllSticky();
        console.log('Refresh sticky notes list');
      }, 15000);*/
      //900000
    },
    methods: {
      checkLocalCookies: async function() {
        var localFingerPrint = localStorage.getItem('fingerPrint');
        this.$store.commit('updateFingerPrint', {
          fingerPrint: localFingerPrint
        });
      
        if(this.$store.state.cookiesEnabled == true && this.$store.state.dummyFingerPrint == null && localFingerPrint != null) {
          this.$store.commit('updateFingerPrint', {
            fingerPrint: await this.getUserFingerPrint()
          });
          localStorage.setItem('fingerPrint', this.$store.state.fingerPrint);
        }

        else if((this.$store.state.cookiesEnabled == false || this.$store.state.cookieEnabled == null ) && this.$store.state.dummyFingerPrint != null && this.$store.state.devMode == true) {
          this.$store.commit('updateFingerPrint', {
            fingerPrint: this.$store.state.dummyFingerPrint
          });
          localStorage.setItem('fingerPrint', this.$store.state.dummyFingerPrint);
        }
      }
    }
  }
</script>
