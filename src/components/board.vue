<template>
    <div class="board flex flex-column">
        <div class="board-filter flex">
            <span>Sort by:</span>
        </div>
        <ul class="board-content flex-item-1">
            <sticky-note v-for="sticky in this.$store.state.stickyNotes" :key="sticky._id" :note="sticky"></sticky-note>
        </ul>
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
        border: 5px solid @black;
        overflow: hidden;
        &-filter {
            height: 48px;
            background: @black;
        }
        &-content {
            padding: 24px;
            overflow: auto;
            margin: 0;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            grid-auto-rows: 300px;
            grid-gap: 12px;

            @media only screen and (max-width: 1200px) {
                grid-template-columns: 1fr 1fr 1fr;
            }
            @media only screen and (max-width: 767px) {
                grid-template-columns: 1fr 1fr;
            }
            @media only screen and (max-width: 375px) {
                grid-template-columns: 1fr;
            }
        }
    }
</style>