<template>
    <li class="stickyNote" v-if="!this.note.reported">
        <div class="stickyNote__inner flex flex-column">
            <div class="stickyNote__header flex flex-justify-right">
                <button class="icon clear">fingerPrint<font-awesome-icon icon="fingerprint"></font-awesome-icon></button>
                <button class="icon clear" :disabled="confirmModalVisible" @click="editModal">
                    <template v-if="!editNoteModalVisible">
                        Edit note<font-awesome-icon icon="pen"></font-awesome-icon>
                    </template>
                    <template v-if="editNoteModalVisible">
                        Cancel edit<font-awesome-icon icon="times"></font-awesome-icon>
                    </template>
                </button>
                <button class="icon clear" :disabled="editNoteModalVisible || confirmModalVisible" @click="showConfirmModal(confirmModalType.delete)">Delete note<font-awesome-icon icon="trash"></font-awesome-icon></button>
                <button class="icon clear" :disabled="editNoteModalVisible || confirmModalVisible" @click="showConfirmModal(confirmModalType.report)">Report<font-awesome-icon icon="flag"></font-awesome-icon></button>
            </div>

            <div class="stickyNote__content relative flex-item-1">
                <template v-if="editNoteModalVisible == false">
                    <p v-html="computedNote" class="stickyNote__content-user-content"></p>
                </template>
                
                <div class="stickyNote__edit relative flex flex-column" v-if="editNoteModalVisible">
                    <textarea v-model="editedNote" class="flex-item-1"></textarea>
                    <div class="stickyNote__edit-button-container flex flex-justify-right">
                        <button class="stickyNote__edit-done" @click="editNote(editedNote)">Done</button>
                    </div>
                    <span v-if="illegalContent" class="stickyNote__edit-alert">Illegal content, please try again.</span>
                </div>

                <confirm-modal v-if="this.confirmModalVisible == true" @confirm="confirm" @deny="deny" :type="selectedModal"></confirm-modal>

                <div v-if="this.$store.state.devMode" class="fingerPrint">{{ this.note.fingerPrint }}</div>
            </div>
        </div>
    </li>
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
                illegalContent: false,
                confirmModalType: {
                    delete: {
                        key: 'delete',
                        string: 'Are you sure you want to delete your note?  This will delete it forever!'
                    },
                    report: {
                        key: 'report',
                        string: 'Do you want to report this note?'
                    },
                },
                selectedModal: {}
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
            showConfirmModal(type) {
                this.confirmModalVisible = true;
                this.selectedModal = type;
            },
            confirm(type) {
                this.confirmModalVisible = false;

                if(type.key === 'delete') {
                    this.deleteStickyNote(this.note);
                }
                if(type.key === 'report') {
                    this.reportStickyNote(this.note);
                }
            },
            deny() {
                this.confirmModalVisible = false;
            },
            editModal: function() {
                if(this.editNoteModalVisible) {
                    this.editedNote = '';
                    this.editNoteModalVisible = false;
                    this.illegalContent = false;
                }
                else {
                    if(this.editedNote == '') {
                        this.editedNote = this.note.note;
                    }
                    this.editNoteModalVisible = true;
                }
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
        padding: 0 15px 15px 0;
        position: relative;
        overflow: hidden;
        &::before {
            content: '';
            display: block;
            background: @black;
            height: calc(100% - 15px);
            width: calc(100% - 15px);
            position: absolute;
            top: 15px;
            left: 15px;
            border-radius: 24px;
        }
        &__inner {
            overflow: hidden;
            border: 4px solid @black;
            border-radius: 24px;
            width: calc(100% - 8px);
            height: calc(100% - 8px);
            position: relative;
            background: @stickyYellow;
        }

        &__header {
            height: 36px;
            border-bottom: 4px solid @black;
            padding: 0 6px;
        }
        &__content {
            padding: 24px 24px 80px 24px;
            &-user-content {
                margin: 0;
            }
        }

        &__edit {
            height: 100%;
            textarea {
                width: 100%;
                margin: 0 0 12px 0;
                padding: 0;
                border: 0;
            }
        }


        .fingerPrint {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
        }
    }
</style>