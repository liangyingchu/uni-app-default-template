<template>
    <view>
        <web-view
            src="/hybrid/html/local.html"
            @message="getMessage"
        />
    </view>
</template>

<script>
    export default {
        name: 'web-view-local',

        methods: {
            getMessage(e) {
                uni.showModal({
                    content: JSON.stringify(e.detail),
                    showCancel: false
                })
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>