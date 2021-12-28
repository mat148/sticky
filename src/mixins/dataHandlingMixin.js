//This global mixin handles getting, editing, and deleting the data both locally and through the API.
const axios = require('axios');
const _ = require('underscore');

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
        updateStickyNotes() {
            //There has to be a better way to do all 3 of these methods
            this.apiGetAllStickyNotes().then(response => {
                //Check if we need to update or create a new note
                _.each(response.data, (apiNote) => {
                    var apiID = apiNote._id;
                    var localFoundNote = _.findWhere(this.$store.state.stickyNotes, {_id: apiID});

                    if(localFoundNote != undefined) {
                        //Update local note
                        var index = _.indexOf(this.$store.state.stickyNotes, localFoundNote);
                        this.$store.commit('updateStickyNote', {
                            index: index,
                            note: apiNote
                        });
                    } else {
                        //Create a new local note
                        this.$store.commit('addStickyNote', {
                            note: apiNote
                        });
                    }
                });

                //Check if we need to delete a local note
                var difference = _.difference(this.$store.state.stickyNotes, response.data);
                if(difference.length > 0) {
                    _.each(difference, (noteToBeDeleted) => {
                        this.$store.commit('removeStickyNote', {
                            noteToBeDeleted: noteToBeDeleted
                        });
                    });
                }
            });
        }
    }
}