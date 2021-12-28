<template>
    <modal v-show="cookieNoModalVisable" @close="cookieNoModalVisable = false">
      <template v-slot:body>
        <button @click="cookieNoModalVisable = false">X</button>
        Your cookies have been disabled. If you would like to edit or delete your posted notes please re-enable cookies and refresh this page before creating a note.
        If not you can still create notes without cookies.
      </template>
    </modal>
</template>

<script>
    export default {
        data: function() {
            return {
                cookieNoModalVisable: false
            }
        },
        methods: {
            identyfyUser() {
                if(!navigator.cookieEnabled) {
                    //Browser cookies aren't enabled
                    this.cookieNoModalVisable = true;
                    console.log('Cookie no');
                }
                //var ua = navigator.userAgent;
            }
        },
        created() {
            this.identyfyUser();
        }
    }
</script>