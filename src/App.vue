<template>
  <div id="app" class="flex flex-column">
    {{this.$store.state.fingerPrint}}
    <!--<div class="stickyBoard">
      <sticky-note v-for="sticky in this.$store.state.stickyNotes" :key="sticky._id" :note="sticky"></sticky-note>
    </div>-->

    <button @click="this.updateStickyNotes">Update list</button>

    <board class="flex-item-1"></board>
    <footer class="flex flex-justify-right">
      <a href="#" target="_blank">About the developer</a>
    </footer>

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
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { faPen, faTrash, faFlag, faLongArrowAltUp, faHeart } from '@fortawesome/free-solid-svg-icons';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  import modal from './components/modal-template.vue';
  import createStickyModal from './components/createStickyModal.vue';
  import cookieYesModal from './components/cookieYesModal.vue';
  import cookieNoModal from './components/cookieNoModal.vue';
  import dataConnectionIssueModal from './components/dataConnectionIssueModal.vue';

  import board from './components/board.vue';
  //import stickyNote from './components/stickyNote.vue';

  import fingerPrintMixin from './mixins/fingerPrintMixin';
  import dataHandlingMixin from './mixins/dataHandlingMixin';

  Vue.component('modal', modal);
  Vue.mixin(dataHandlingMixin);
  Vue.mixin(fingerPrintMixin);

  library.add(faPen, faTrash, faFlag, faLongArrowAltUp, faHeart);
  Vue.component('font-awesome-icon', FontAwesomeIcon);

  export default {
    name: 'App',
    store: store,
    components: {
      board,
      //stickyNote,
      createStickyModal,
      cookieYesModal,
      cookieNoModal,
      dataConnectionIssueModal
    },
    async created() {
      this.checkLocalCookies();
      this.getAllStickyNotes();

      //this.updateStickyNotes();

      /*const self = this;
      setInterval(function(){
        self.updateStickyNotes();
        console.log('Refresh sticky notes list');
      }, 900000);*/
      //Every 15 minutes > 900,000 ms
      //15000
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

<style lang="less">
  @import './styles/variables.less';
  @import (css) url('https://fonts.googleapis.com/css2?family=Commissioner:wght@400;700&family=Fraunces:wght@400;700&display=swap');

  body {
    margin: 0;
    font-family: 'Commissioner', sans-serif;
    font-weight: 400;
    overflow-wrap: break-word;
  }

  #app {
    height: calc(100vh - 24px);
    width: calc(100vw - 48px);
    background: @background;
    padding: 24px 24px 0 24px;
    overflow: hidden;
    display: flex;
  }
  
  footer {
    height: 48px;
    line-height: 48px;
  }
</style>