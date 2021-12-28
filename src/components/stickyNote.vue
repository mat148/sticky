<template>
    <div class="stickyNote">
        {{ this.note.fingerPrint }}
        <div v-if="editNoteModalVisible == false" class="stickyNote__content" v-html="computedNote"></div>
        <button @click="editModal" v-if="showButton()">Edit note</button>

        <div class="stickyNote__edit" v-if="editNoteModalVisible">
            <button class="stickyNote__edit-close" @click="editNoteModalVisible = false">X</button>
            <textarea v-model="editedNote"></textarea>
            <button class="stickyNote__edit-done" @click="editNote(editedNote)">Done</button>
            <span v-if="illegalContent" class="stickyNote__edit-alert">Illegal content, please try again.</span>
        </div>

        <button @click="confirmModalVisible = true" v-if="showButton()">Delete note</button>
        <confirm-modal v-if="this.confirmModalVisible == true" @confirm="confirm" @deny="deny"></confirm-modal>
    </div>
</template>

<script>
    import { store } from '../store/store';
    import confirmModal from './confirmModal.vue';
    import sanitizeHtml from 'sanitize-html';

    export default {
        store: store,
        components: {
            confirmModal
        },
        data: function() {
            return {
                confirmModalVisible: false,
                editNoteModalVisible: false,
                editedNote: '',
                illegalContent: false
            }
        },
        props: {
            note: { required: false, type: Object }
        },
        methods: {
            showButton() {
                if (this.note.fingerPrint == this.$store.state.fingerPrint && this.note.fingerPrint != null && this.$store.state.fingerPrint != null && this.editNoteModalVisible == false) {
                    return true
                } else {
                    return false
                }
            },
            confirm() {
                this.confirmModalVisible = false;
                this.deleteStickyNote(this.note);
            },
            deny() {this.confirmModalVisible = false;},
            editModal: function() {
                if(this.editedNote == '') {
                    this.editedNote = this.note.note;
                }
                this.editNoteModalVisible = true;
            },
            editNote(editedNote) {
                var sanitizedHtml = sanitizeHtml(editedNote, {
                    allowedTags: ['strong', 'i', 'h1', 'h2', 'h3', 'code', 'u' , 's'],
                    allowedAttributes: {}
                });

                if(editedNote != sanitizedHtml) {
                    //Illegal content
                    this.illegalContent = true;
                } else {
                    //Good content
                    this.illegalContent = false;
                    this.editStickyNote(this.note, editedNote).then(() => {
                        this.editNoteModalVisible = false;
                    });
                }
            }
        },
        computed: {
            computedNote: function() {
                if(this.editedNote != '') {
                    return this.editedNote;
                } else return this.note.note;
            }
        }
    }
</script>