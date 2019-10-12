<template>
    <view class="canvas-page">
        <view class="canvas-wrap">
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

        data() {
            return {
                front: 'pic', // circle
                picSize: 72, // 图片尺寸

                touchX: null, // 触点x轴位置
                touchY: null, // 触点y轴位置

                circleX: 50, // 圆心x轴位置
                circleY: 50, // 圆心y轴位置
                picOffsetX: 0, // 图片x轴位置
                picOffsetY: 0 // 图片y轴位置
            }
        },

        computed: {
            isAvailableTouch() {
                return typeof this.touchX === 'number' && typeof this.touchY === 'number'
            }
        },

        onReady() {
            context = uni.createCanvasContext('canvas', this)
            this.draw()
        },

        methods: {

            // 绘制图片
            describePic(picOffsetX, picOffsetY) {
                context.drawImage('../../../../static/logo.png', picOffsetX, picOffsetY, 72, 72)
            },

            // 绘制笑脸表情
            describeFace(circleX, circleY) {
                context.beginPath()
                context.setLineWidth(2)
                // context.setFillStyle('#FFB800')
                context.arc(circleX, circleY, 50, 0, Math.PI * 2, true)
                // context.fill()
                context.moveTo(circleX + 35, circleY)
                context.arc(circleX, circleY, 35, 0, Math.PI, false)
                context.moveTo(circleX - 10, circleY - 10)
                context.arc(circleX - 15, circleY - 10, 5, 0, Math.PI * 2, true)
                context.moveTo(circleX + 20, circleY - 10)
                context.arc(circleX + 15, circleY - 10, 5, 0, Math.PI * 2, true)
                context.stroke()
            },

            // 渲染绘图
            draw(state, x, y) {
                context.globalCompositeOperation = this.front === 'pic' ? 'source-over' : 'destination-over'
                if(state === 'move') {
                    if(this.front === 'pic') {
                        this.describeFace(this.circleX, this.circleY)
                        this.describePic(x, y)
                    } else {
                        this.describeFace(x, y)
                        this.describePic(this.picOffsetX, this.picOffsetY)
                    }
                } else {
                    console.log(this.front === 'pic')
                    this.describeFace(this.circleX, this.circleY)
                    this.describePic(this.picOffsetX, this.picOffsetY)
                }
                context.draw()
            },

            handleTouchstart(e) {
                const { x, y } = e.touches[0] // x 和 y 是相对画布的

                if(this.front === 'pic') {
                    const isAvailableX = x >= this.picOffsetX && x <= this.picOffsetX + this.picSize
                    const isAvailableY = y >= this.picOffsetY && y <= this.picOffsetY + this.picSize
                    if(isAvailableX && isAvailableY) {
                        // 有效触点
                        this.front = 'pic'
                        this.touchX = x
                        this.touchY = y
                        this.draw()
                    } else {
                        const isAvailableX = x >= this.circleX - 50 && x <= this.circleX + 50
                        const isAvailableY = y >= this.circleY - 50 && y <= this.circleY + 50
                        if(isAvailableX && isAvailableY) {
                            // 有效触点
                            this.front = 'circle'
                            this.touchX = x
                            this.touchY = y
                            this.draw()
                        }
                    }
                } else {
                    const isAvailableX = x >= this.circleX - 50 && x <= this.circleX + 50
                    const isAvailableY = y >= this.circleY - 50 && y <= this.circleY + 50
                    if(isAvailableX && isAvailableY) {
                        // 有效触点
                        this.front = 'circle'
                        this.touchX = x
                        this.touchY = y
                        this.draw()
                    } else {
                        const isAvailableX = x >= this.picOffsetX && x <= this.picOffsetX + this.picSize
                        const isAvailableY = y >= this.picOffsetY && y <= this.picOffsetY + this.picSize
                        if(isAvailableX && isAvailableY) {
                            // 有效触点
                            this.front = 'pic'
                            this.touchX = x
                            this.touchY = y
                            this.draw()
                        }
                    }
                }
            },

            handleTouchmove(e) {
                if(this.isAvailableTouch) {
                    const { x, y } = e.touches[0]
                    const { windowWidth, windowHeight } = uni.getSystemInfoSync()
                    const dx = x - this.touchX
                    const dy = y - this.touchY

                    let maxOffsetX, maxOffsetY, offsetX, offsetY
                    if(this.front === 'pic') {
                        maxOffsetX = windowWidth - this.picSize - 30
                        maxOffsetY = windowHeight - this.picSize - 20
                        offsetX = this.picOffsetX + dx < 0 ? 0 :
                            (this.picOffsetX + dx > maxOffsetX ? maxOffsetX : this.picOffsetX + dx)
                        offsetY = this.picOffsetY + dy < 0 ? 0 :
                            (this.picOffsetY + dy > maxOffsetY ? maxOffsetY : this.picOffsetY + dy)
                    } else {
                        maxOffsetX = windowWidth - 80
                        maxOffsetY = windowHeight - 70
                        offsetX = this.circleX + dx < 50 ? 50 :
                            (this.circleX + dx > maxOffsetX ? maxOffsetX : this.circleX + dx)
                        offsetY = this.circleY + dy < 50 ? 50 :
                            (this.circleY + dy > maxOffsetY ? maxOffsetY : this.circleY + dy)
                    }

                    context.clearRect(0, 0, windowWidth, windowHeight)
                    this.draw('move', offsetX, offsetY)
                }
            },

            handleTouchend(e) {
                if(this.isAvailableTouch) {
                    const { x, y } = e.changedTouches[0]
                    const { windowWidth, windowHeight } = uni.getSystemInfoSync()
                    const dx = x - this.touchX
                    const dy = y - this.touchY

                    let maxOffsetX, maxOffsetY
                    if(this.front === 'pic') {
                        maxOffsetX = windowWidth - this.picSize - 30
                        maxOffsetY = windowHeight - this.picSize - 20
                        this.picOffsetX = this.picOffsetX + dx < 0 ? 0 :
                            (this.picOffsetX + dx > maxOffsetX ? maxOffsetX : this.picOffsetX + dx)
                        this.picOffsetY = this.picOffsetY + dy < 0 ? 0 :
                            (this.picOffsetY + dy > maxOffsetY ? maxOffsetY : this.picOffsetY + dy)
                    } else {
                        maxOffsetX = windowWidth - 80
                        maxOffsetY = windowHeight - 70
                        this.circleX = this.circleX + dx < 50 ? 50 :
                            (this.circleX + dx > maxOffsetX ? maxOffsetX : this.circleX + dx)
                        this.circleY = this.circleY + dy < 50 ? 50 :
                            (this.circleY + dy > maxOffsetY ? maxOffsetY : this.circleY + dy)
                    }

                }
                this.touchX = null
                this.touchY = null
            }

        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .canvas-page {
        box-sizing: border-box;
        width: 100vw;
        height: 100vh;
        padding: 0 15px;
        background-color: #f7f7f7;

        .canvas-wrap {
            padding-top: 10px;
        }

        .canvas {
            width: 100%;
            height: calc(100vh - 20px);
            background-color: #ffffff;
        }
    }
</style>