<template>
    <view class="canvas-page uni-padding-wrap">
        <view class="uni-pt20">
            <canvas
                class="canvas"
                canvas-id="canvas"
                id="canvas"
                @touchstart="handleTouchstart"
                @touchmove.prevent="handleTouchmove"
                @touchend="handleTouchend"
            ></canvas>
        </view>
    </view>
</template>

<script>
    let context = null

    export default {
        name: 'Drag',

        onReady() {
            context = uni.createCanvasContext('canvas', this)
            this.drawPic(this.picOffsetX, this.picOffsetY)
        },

        data() {
            return {
                touchX: null, // 触点x轴位置
                touchY: null, // 触点y轴位置

                picOffsetX: 0, // 图片x轴位置
                picOffsetY: 0 // 图片y轴位置
            }
        },

        computed: {},

        methods: {

            drawPic(x, y) {
                context.drawImage('../../../../static/logo.png', x, y, 72, 72)
                context.draw()
            },

            handleTouchstart(e) {
                const { x, y } = e.touches[0] // x 和 y 是相对画布的
                if((x >= this.picOffsetX && x <= this.picOffsetX + 72) && (y >= this.picOffsetY && y <= this.picOffsetY + 72)) {
                    // 有效触点
                    this.touchX = x
                    this.touchY = y
                }
            },

            handleTouchmove(e) {
                const { x, y } = e.touches[0]
                const { windowWidth, windowHeight } = uni.getSystemInfoSync()

                if(typeof this.touchX === 'number' && typeof this.touchY === 'number') {
                    const dx = x - this.touchX
                    const dy = y - this.touchY
                    const offsetX = this.picOffsetX + dx < 0 ? 0 : (this.picOffsetX + dx > 273 ? 273 : this.picOffsetX + dx)
                    const offsetY = this.picOffsetY + dy < 0 ? 0 : (this.picOffsetY + dy > 513 ? 513 : this.picOffsetY + dy)

                    context.clearRect(0, 0, windowWidth, windowHeight)
                    this.drawPic(offsetX, offsetY)
                }

            },

            handleTouchend(e) {
                const { x, y } = e.changedTouches[0]
                const dx = x - this.touchX
                const dy = y - this.touchY

                this.picOffsetX = this.picOffsetX + dx < 0 ? 0 : (this.picOffsetX + dx > 273 ? 273 : this.picOffsetX + dx)
                this.picOffsetY = this.picOffsetY + dy < 0 ? 0 : (this.picOffsetY + dy > 513 ? 513 : this.picOffsetY + dy)
                this.touchX = null
                this.touchY = null
            }

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .canvas-page {
        height: 100vh;
        background-color: #f7f7f7;

        .canvas {
            width: 100%;
            height: calc(100vh - 40rpx);
            background-color: #ffffff;
        }
    }
</style>