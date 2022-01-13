<template>
    <div class="board flex flex-column">
        <div class="board-filter flex">
            <span>Sort by:</span>
        </div>
        <div class="board-content flex-item-1 flex flex-wrap">
            <sticky-note v-for="sticky in this.$store.state.stickyNotes" :key="sticky._id" :note="sticky"></sticky-note>
        </div>
    </div>
</template>

<script>
    import stickyNote from '../components/stickyNote.vue';

    export default {
        components: {
            stickyNote
        }
    }
</script>

<style lang="less" scoped>
    @import '../styles/variables.less';

    .board {
        background: @boardBackground;
        border-radius: 40px;
        border: 6px solid @black;
        overflow: hidden;
        &-filter {
            height: 48px;
            background: @black;
        }
        &-content {
            padding: 24px 120px 0 48px;
            overflow: auto;
        }
    }
</style>