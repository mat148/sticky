<template>
    <modal v-if="this.$store.state.dataConnectionIssueVisible == true">
        <template v-slot:body>
            <button @click="closeModal()">X</button>
            <p>We seem to be having some technical issues, sorry for the inconvenience.  Please try again later.</p>
            <div style="width:100%;height:0;padding-bottom:56%;position:relative;">
                <iframe src="https://giphy.com/embed/W561jj5bXQvqGRMXoR" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
        </template>
    </modal>
</template>

<script>
    export default {
        methods: {
            closeModal: function() {
                this.$store.commit('toggleDataConnectionIssueModal');
            }
        }
    }
</script>