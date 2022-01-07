<template>
    <div class="stickyNote" v-if="!this.note.reported">
        {{ this.note.fingerPrint }}
        <div v-if="editNoteModalVisible == false" class="stickyNote__content" v-html="computedNote"></div>
        <button @click="editModal" v-if="showButton()">Edit note</button>

        <div class="stickyNote__edit" v-if="editNoteModalVisible">
            <button class="stickyNote__edit-close" @click="closeEditNoteModal()">X</button>
            <textarea v-model="editedNote"></textarea>
            <button class="stickyNote__edit-done" @click="editNote(editedNote)">Done</button>
            <span v-if="illegalContent" class="stickyNote__edit-alert">Illegal content, please try again.</span>
        </div>

        <button @click="confirmModalVisible = true" v-if="showButton()">Delete note</button>
        <confirm-modal v-if="this.confirmModalVisible == true" @confirm="confirm" @deny="deny"></confirm-modal>

        <button @click="reportNote()">Report</button>
    </div>
</template>

<script>
    import { store } from '../store/store';
    import confirmModal from './confirmModal.vue';
    import sanitizeHtml from 'sanitize-html';

    var Filter = require('bad-words'),
    filter = new Filter();

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

                if(sanitizedHtml != '') sanitizedHtml = filter.clean(sanitizedHtml);

                if(editedNote != sanitizedHtml || sanitizedHtml == '') {
                    //Illegal content
                    this.illegalContent = true;
                } else {
                    //Good content
                    this.illegalContent = false;
                    this.editStickyNote(this.note, editedNote).then(() => {
                        this.editNoteModalVisible = false;
                    });
                }
            },
            closeEditNoteModal() {
                this.editedNote = '';
                this.editNoteModalVisible = false;
                this.illegalContent = false;
            },
            reportNote() {
                this.reportStickyNote(this.note);
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

<style lang="less" scoped>
    @import '../styles/variables.less';

    .stickyNote {
        background: @stickyYellow;
        flex: 1 1 25%;
        height: 370px;
    }
</style>