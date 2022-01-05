<template>
    <div class="board relative" :style="{'background-image':'url(' + corkBoard + ')'}">
        <div class="board-trim left-right absolute">
            <div class="board-trim-left absolute" :style="{'background-image':'url(' + verticalBoardTexture + ')'}"></div>
            <div class="board-trim-right absolute" :style="{'background-image':'url(' + verticalBoardTexture + ')'}"></div>
        </div>
        <div class="board-trim top-bottom absolute">
            <div class="board-trim-top absolute" :style="{'background-image':'url(' + horizontalBoardTexture + ')'}">
                <div class="board-trim-corner top-left absolute" :style="{'background-image':'url(' + cornerTexture + ')'}"></div>
                <div class="board-trim-corner top-right absolute" :style="{'background-image':'url(' + cornerTexture + ')'}"></div>
            </div>
            <div class="board-trim-bottom absolute" :style="{'background-image':'url(' + horizontalBoardTexture + ')'}">
                <div class="board-trim-corner bottom-left absolute" :style="{'background-image':'url(' + cornerTexture + ')'}"></div>
                <div class="board-trim-corner bottom-right absolute" :style="{'background-image':'url(' + cornerTexture + ')'}"></div>
            </div>
        </div>
        <div class="board-inner absolute">
            <sticky-note v-for="sticky in this.$store.state.stickyNotes" :key="sticky._id" :note="sticky"></sticky-note>
        </div>
    </div>
</template>

<script>
    import stickyNote from '../components/stickyNote.vue';

    export default {
        components: {
            stickyNote
        },
        data: function() {
            return {
                horizontalBoardTexture: require('../../public/straightPieceTexture-horizontal.png'),
                verticalBoardTexture: require('../../public/straightPieceTexture-vertical.png'),
                cornerTexture: require('../../public/cornerPieceTexture-top-left.png'),
                corkBoard: require('../../public/corkBoard.png')
            }
        }
    }
</script>

<style lang="less" scoped>
    .board {
        background: white;
        height: 100%;
        width: 100%;
        &-trim {
            &.left-right, &.top-bottom {
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                .board-trim-right, .board-trim-left, .board-trim-top, .board-trim-bottom {}
            }
            &.left-right {
                .board-trim-right, .board-trim-left {
                    top: 50%;
                    transform: translateY(-50%);
                    width: 200px;
                    height: 100%;
                }
                .board-trim-left {
                    left: 0;
                }
                .board-trim-right {
                    right: 0;
                }
            }
            &.top-bottom {
                .board-trim-top, .board-trim-bottom {
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    height: 200px;
                }
                .board-trim-bottom {
                    bottom: 0;
                }
            }
            &-corner {
                width: 200px;
                height: 200px;
                &.top-right {
                    right: 0;
                    transform: rotate(90deg);
                }
                &.bottom-right {
                    right: 0;
                    bottom: 0;
                    transform: rotate(180deg);
                }
                &.bottom-left {
                    bottom: 0;
                    transform: rotate(270deg);
                }
            }
        }
        &-inner {
            top: 200px;
            left: 200px;
            width: calc(100% - 400px);
            height: calc(100% - 400px);
        }
    }
</style>