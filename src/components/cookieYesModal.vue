<template>
    <modal v-if="cookieYesModalVisable" @close="cookieYesModalVisable = false">
      <template v-slot:body>
        This site uses cookies to allow you to edit and delete your posted notes.
        <button @click="enableCookies()">Accept cookies</button>
        <button @click="disableCookies()">Disable cookies</button>
      </template>
    </modal>
</template>

<script>
    export default {
        data: function() {
            return {
                cookieYesModalVisable: false
            }
        },
        methods: {
            checkLocalCookies() {
                if(navigator.cookieEnabled) {
                    //Browser cookies are enabled
                    var localCookiesEnabled = localStorage.getItem('cookiesEnabled');
                    
                    if(localCookiesEnabled != 'true') {
                        this.cookieYesModalVisable = true;
                    }
                }
            },
            async enableCookies() {
                this.cookieYesModalVisable = false;
                this.$store.commit('updateCookiesEnabled', {
                    cookieEnabled: true
                });

                localStorage.setItem('cookiesEnabled', true);

                this.$store.commit('updateFingerPrint', {
                    fingerPrint: await this.getUserFingerPrint()
                });
            },
            disableCookies() {
                this.cookieYesModalVisable = false;
                this.$store.commit('updateCookiesEnabled', {
                    cookieEnabled: false
                });

                localStorage.setItem('cookiesEnabled', false);
            }
        },
        created() {
            this.checkLocalCookies();
        }
    }
</script>