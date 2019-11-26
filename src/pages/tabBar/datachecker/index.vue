<template>
    <view class="form-page uni-padding-wrap">
        <form @reset="formReset" @submit="formSubmit">

            <view class="form-item">
                <view class="form-item-label">姓名</view>
                <view class="uni-list">
                    <view class="uni-list-cell">
                        <input class="uni-input" name="nickname" placeholder="请填写您的昵称" />
                    </view>
                </view>
            </view>

            <view class="form-item">
                <view class="form-item-label">性别</view>
                <radio-group class="uni-flex" name="gender">
                    <label>
                        <radio value="男" />男
                    </label>
                    <label>
                        <radio value="女" />女
                    </label>
                </radio-group>
            </view>

            <view class="form-item">
                <view class="form-item-label">爱好</view>
                <checkbox-group class="uni-flex" name="loves">
                    <label>
                        <checkbox value="读书" />读书
                    </label>
                    <label>
                        <checkbox value="写字" />写字
                    </label>
                </checkbox-group>
            </view>

            <view class="uni-mt30 uni-pt10 uni-pb10">
                <button class="uni-mb20" type="primary" formType="submit">Submit</button>
                <button plain id="reset" type="primary" formType="reset">Reset</button>
            </view>

        </form>
    </view>
</template>

<script>
    const formChecker = require('@/utils/formChecker')

    export default {
        name: 'DataChecker',

        methods: {
            formReset(e) {
                console.log("清空数据")
            },

            formSubmit(e) {
                //将下列代码加入到对应的检查位置
                //定义表单规则
                const rule = [
                    {name:"nickname", checkType : "string", checkRule:"1,3",  errorMsg:"姓名应为1-3个字符"},
                    {name:"gender", checkType : "in", checkRule:"男,女",  errorMsg:"请选择性别"},
                    {name:"loves", checkType : "notnull", checkRule:"",  errorMsg:"请选择爱好"}
                ]
                //进行表单检查
                const formData = e.detail.value
                const checkRes = formChecker.check(formData, rule)
                if(checkRes) {
                    uni.showToast({ title:"验证通过!", icon: "none" })
                }else{
                    uni.showToast({ title: formChecker.error, icon: "none" })
                }
            }
        }
    }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

    /* 列表 */
    .uni-list {
        background-color: #FFFFFF;
        position: relative;
        width: 100%;
        display: flex;
        flex-direction: column;

        &::before {
            position: absolute;
            z-index: 10;
            right: 0;
            top: 0;
            left: 0;
            height: 1px;
            content: '';
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
            background-color: #c8c7cc;
        }

        &:after {
            position: absolute;
            z-index: 10;
            right: 0;
            bottom: 0;
            left: 0;
            height: 1px;
            content: '';
            -webkit-transform: scaleY(.5);
            transform: scaleY(.5);
            background-color: #c8c7cc;
        }

        &-cell {
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
        }
    }

    .uni-input {
        height: 50rpx;
        padding: 15rpx 25rpx;
        line-height: 50rpx;
        font-size: 28rpx;
        background: #FFF;
        flex: 1;
    }

    radio-group, checkbox-group{
        width:100%;
    }
    radio-group label, checkbox-group label{
        padding-right:20upx;
    }

    .form-page {
        height: 100vh;
        background-color: #f7f7f7;
        .form-item {
            &-label {
                 font-size: 30rpx;
                 font-weight: 500;
                 padding: 20rpx 0;
                 line-height :1.5;
            }
        }
    }
</style>