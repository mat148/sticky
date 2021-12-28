<template>
    <transition name="modal">
        <div class="modal">
            <!--<header class="modal-header">
                <slot name="header">
                    This is the default title!
                </slot>
                <button @click="close" class="modal-button-close">X</button>
            </header>-->

            <div class="modal-body">
                <slot name="body">
                    This is the default body!
                </slot>
            </div>

            <!--<footer class="modal-footer">
                <slot name="footer">
                    This is the default footer!
                </slot>
            </footer>-->
        </div>
    </transition>
</template>

<script>
    export default {
        name: 'Modal',
        methods: {
            close() {
                this.$emit('close');
            }
        }
    }
</script>