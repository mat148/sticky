<template>
  <div id="app">
    <div class="stickyBoard">
      <sticky-note v-for="sticky in stickyNotes" :key="sticky" :test="sticky.note"></sticky-note>
      {{ info }}
    </div>
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
        stickyNotes: [
          {note: 'Lorem ipsum 1'},
          {note: 'Lorem ipsum 2'},
          {note: 'Lorem ipsum 3'}
        ],
        info: []
      }
    },
    created() {
      axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => {
        // handle success
        this.info = response.data
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
    }
  }
</script>
