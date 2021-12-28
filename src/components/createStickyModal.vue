<template>
    <div class="modal-container">
        <button id="showSubmitModal" @click="isCreateStickyModalVisable = true">Show Modal</button>
        <modal v-show="isCreateStickyModalVisable" @close="isCreateStickyModalVisable = false">
            <template v-slot:body>
                <button class="modal-close" @click="closeCreateStickyModal()">X</button>
                <span>What would you like to share?</span>
                <textarea v-model="message"></textarea>
                <button id="submitModal" @click="submitModal(message)">Submit</button>
                <span v-if="illegalContent" class="createModal__edit-alert">Illegal content, please try again.</span>
            </template>
        </modal>
    </div>
</template>

<script>
    import sanitizeHtml from 'sanitize-html';
    var Filter = require('bad-words'),
    filter = new Filter();

    export default {
        data: function() {
            return {
                isCreateStickyModalVisable: false,
                message: '',
                illegalContent: false
            }
        },
        methods: {
            async submitModal(message) {
                var sanitizedHtml = sanitizeHtml(message, {
                    allowedTags: ['strong', 'i', 'h1', 'h2', 'h3', 'code', 'u' , 's'],
                    allowedAttributes: {}
                });

                if(sanitizedHtml != '') sanitizedHtml = filter.clean(sanitizedHtml);

                if(message != sanitizedHtml || sanitizedHtml == '') {
                    //Illegal content
                    this.illegalContent = true;
                } else {
                    //Good content
                    this.illegalContent = false;

                    this.createNewStickyNote(message).then(() => {
                        this.isCreateStickyModalVisable = false;
                        this.message = '';
                    });
                }
            },
            closeCreateStickyModal() {
                this.message = '';
                this.isCreateStickyModalVisable = false;
                this.illegalContent = false;
            }
        }
    }
</script>