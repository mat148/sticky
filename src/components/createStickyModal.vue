<template>
    <div class="modal-container">
        <button id="showSubmitModal" @click="isCreateStickyModalVisable = true">Show Modal</button>
        <modal v-show="isCreateStickyModalVisable" @close="isCreateStickyModalVisable = false">
            <template v-slot:body>
                <button class="modal-close" @click="isCreateStickyModalVisable = false">X</button>
                <span>What would you like to share?</span>
                <textarea v-model="message"></textarea>
                <button id="submitModal" @click="submitModal(message)">Submit</button>
            </template>
        </modal>
    </div>
</template>

<script>
    import fingerPrintMixin from '../mixins/fingerPrintMixin';

    export default {
        data: function() {
            return {
                isCreateStickyModalVisable: false,
                message: ''
            }
        },
        mixins: [fingerPrintMixin],
        methods: {
            async submitModal(message) {
                console.log(message);

                await this.createNewStickyNote(message).then(() => {
                    this.isCreateStickyModalVisable = false;
                    this.message = '';
                });
            }
        }
    }
</script>