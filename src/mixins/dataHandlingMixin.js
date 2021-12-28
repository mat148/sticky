//This global mixin handles getting, editing, and deleting the data both locally and through the API.
const axios = require('axios');

export default {
    methods: {
        apiGetAllStickyNotes() {
            return new Promise((resolve, reject) => {
                axios
                .get('http://localhost:3000/getAllSticky')
                .then(response => {
                    //handle success
                    resolve(response);
                })
                .catch(err => {
                    //handle error
                    reject(console.log(err));
                    this.$store.commit('toggleDataConnectionIssueModal');
                });
            });
        },
        getAllStickyNotes() {
            this.apiGetAllStickyNotes().then(response => {
                this.$store.commit('replaceAllStickyNotes', {
                    data: response.data
                });
            })
        },
        createNewStickyNote(message) {
            return new Promise((resolve, reject) => {
                var fingerPrint = this.$store.state.fingerPrint;

                axios.post('http://localhost:3000/stickyNoteAdd', {
                    note: message,
                    fingerPrint: fingerPrint
                }).then((response) => {
                    this.$store.commit('addStickyNote', {
                        note: response.data
                    });

                    resolve(response);
                }).catch(err => {
                    reject(console.log(err));
                    this.$store.commit('toggleDataConnectionIssueModal');
                });
            });
        },
        deleteStickyNote(note) {
            return axios.post('http://localhost:3000/stickyNoteDelete', {
                noteID: note._id
            }).then(() => {
                this.$store.commit('removeStickyNote', {
                    noteToBeDeleted: note
                });
            }).catch(err => {
                console.error(err);
                this.$store.commit('toggleDataConnectionIssueModal');
            });
        },
        editStickyNote(noteObect, editedNote) {
            return new Promise((resolve, reject) => {
                axios.post('http://localhost:3000/stickyNoteEdit', {
                    noteID: noteObect._id,
                    note: editedNote
                }).then(() => {
                    resolve();
                }).catch(err => {
                    reject(console.error(err));
                    this.$store.commit('toggleDataConnectionIssueModal');
                });
            });
        },
        updateStickyNotes(apiNote) {
            //Loop through all the notes in response.data
            //Find matching id in $store stickyNotes
            //If no match, add a new entry to $store stickyNotes
            //If match
                //Check content match, update or skip
            console.log(apiNote._id);

            this.apiGetAllStickyNotes().then(response => {
                //var foundNote;

                console.log(response.data);
                console.log(this.$store.state.stickyNotes);

                //This will loop through all of the notes recieved from the database.
                /*_.each(response.data, () => {
                    //console.log(note);

                    //Loop through all notes in $store and return with matching id
                    foundNote = _.find(this.$store.state.stickyNotes, localNote => {
                        if(localNote._id == apiNote._id) {
                            return localNote;
                        }
                    });
                });*/
                //console.log(foundNote);
                //this.$store.state.stickyNotes.splice(foundNote);
            });
            
            /*this.apiGetAllStickyNotes().then((response) => {
                _.each(response.data, () => {
                    //console.log(note);
                    var foundNote = _.find(this.$store.state.stickyNotes, (note) => {return note._id = id;});
                    console.log(foundNote);
                });
            });*/
        }
    }
}