<template>
  <div id="app">
    <div class="stickyBoard">
      <sticky-note v-for="sticky in stickyNotes" :key="sticky" :test="sticky.note"></sticky-note>
      {{ info }}
    </div>

    <button id="showModal" @click="showModal = true">Show Modal</button>

    <modal v-if="showModal" @close="showModal = false">
      <button id="closeModal" @click="showModal = false">Close Modal</button>
      <span>What would you like to share?</span>
      <textarea v-model="message"></textarea>
      <button id="submitModal" @click="submitModal(message)">Submit</button>
    </modal>
  </div>
</template>

<script>
  import stickyNote from './components/stickyNote.vue';
  const axios = require('axios');

  export default {
    name: 'App',
    components: {
      stickyNote
    },
    data: function() {
      return {
        stickyNotes: [],
        showModal: false,
        isLoading: false
      }
    },
    created() {
      this.getAllSticky().then(() => {});
    },
    methods: {
      submitModal(stickyMessage) {
        console.log(stickyMessage);
        this.isLoading = true;

        return axios.post('http://localhost:3000/stickyNoteAdd', {
          note: stickyMessage
        }).then(() => {
          this.isLoading = false;
          this.showModal = false;
          this.getAllSticky();
        }).catch(err => {
          console.error(err);
          this.isLoading = false;
        });
      },
      getAllSticky: function() {
        axios
        .get('http://localhost:3000/getAllSticky')
        .then(response => {
          // handle success
          this.stickyNotes = response.data;
        })
        .catch(function (error) {
          // handle error
          console.error(error);
        });
      }
    }
  }
</script>
