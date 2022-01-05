<template>
    <div class="stickyNote absolute" v-if="!this.note.reported" :style="{'transform':'rotate(' + computedRange + 'deg)', 'top': 'calc(' + computedPosition.y + '% - ' + computedPosition.yOff + 'px)', 'left': 'calc(' + computedPosition.x + '% - ' + computedPosition.xOff + 'px)'}">
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

    const _ = require('underscore');
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
            },
            computedRange: function() {
                if((Math.random() * (1 - 0) + 0) == 0) {
                    return (Math.random() * (360 - 348) + 348);
                } else {
                    return (Math.random() * (12 - 0) + 0);
                }
            },
            computedPosition: function() {
                let data = {};
                data.x = Math.random() * (100 - 0) + 0;
                data.y = Math.random() * (100 - 0) + 0;

                if(data.y < 3 && data.y > 0) {data.yOff = -48;}
                else if(data.y > 25) {data.yOff = 300;}
                else data.yOff = 0;

                _.each(this.$store.state.stickyNotes, function(note) {
                    if (note.position) {
                        let localYPos = note.position.y;
                        let offset = 5;

                        //console.log(data.y, (localYPos - offset), (localYPos + offset));
                        //console.log(data.y > (localYPos - offset) && data.y < (localYPos + offset));
                        console.log(data.y > (localYPos - offset), data.y < (localYPos + offset));
                        if(data.y > (localYPos - offset) && data.y < (localYPos + offset)) {
                            //console.log(data.y, localYPos);
                        }
                    }
                });

                if(data.x < 3 && data.x > 0) {data.xOff = -48;}
                else if(data.x > 25) {data.xOff = 300;}
                else data.xOff = 0;

                this.$store.commit('updateStickyNotePosition', {
                    note: this.note,
                    x: data.x,
                    y: data.y
                });

                return data
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../styles/variables.less';

    .stickyNote {
        background: @yellow;
        height: 20%;
        width: 20%;
        max-height: 300px;
        max-width: 300px;
        box-shadow: 0 3px 12px 0px rgb(0 0 0 / 30%);
    }
</style>