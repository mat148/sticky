<template>
    <div class="stickyNote">
        <span class="stickyNote__title">{{ test }}</span>
    </div>
</template>

<script>
    export default {
        props: {
            test: { required: false, type: String }
        }
    }
</script>