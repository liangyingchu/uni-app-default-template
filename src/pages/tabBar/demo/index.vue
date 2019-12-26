<template>
	<view>
		<view class="uni-mt20 uni-mb30">
			<uni-card
				is-shadow
				mode="title"
				title="WebView"
				thumbnail="https://img-cdn-qiniu.dcloud.net.cn/new-page/uni.png"
				extra="点击查看"
				note="true"
				@click="clickCard"
			>
				<view class="uni-card-body">
					<view class="uni-card-body-image">
						<image mode="aspectFill" src="http://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/run1x7.png" />
					</view>
					<view class="uni-pt20">
						点击当前卡片，前往 web-view demo 页
					</view>
				</view>

				<template v-slot:footer>
					<view class="uni-flex-between uni-row width100percent">
						<view
							v-for="(el, i) in cardOperations"
							:key="i"
							class="uni-flex uni-row uni-align-center"
							@click.stop="footerClick(el)"
						>
							<text>{{ el }}</text>
						</view>
					</view>
				</template>
			</uni-card>
		</view>

		<view class="uni-mb30">
			<uni-card
				is-shadow
				title="Popup"
				extra="额外信息"
			>
				<view>
					<button id="topPopup" class="uni-mb20" type="default" @click="togglePopup('top', 'popup')">顶部弹出 popup</button>
					<button id="centerPopup" class="uni-mb20" type="primary" @click="togglePopup('center', 'popup')">中间弹出 popup</button>
					<button id="bottomPopup" class="uni-mb20" type="warn" @click="togglePopup('bottom', 'popup')">底部弹出 popup</button>
					<button plain id="tipPopup" type="warn" @click="togglePopup('center', 'tip')">自定义弹出层</button>
				</view>
			</uni-card>
		</view>

		<!--日历-->
		<!--  #ifdef H5 -->
		<view class="uni-mb30">
			<uni-card
				is-shadow
				title="日历"
				extra="仅 H5 可见"
			>
				<uni-calendar
					:insert="true"
					:lunar="true"
					@change="calendarChange"
				/>
			</uni-card>
		</view>
		<!--  #endif -->

		<!--默认弹层-->
		<uni-popup ref="popup" :type="type" @change="handleChange">
			{{ content }}
		</uni-popup>

		<!--自定义弹层-->
		<uni-popup custom :mask-click="false" :show="show" :type="type" @change="handleChange">
			<view class="uni-tip border-box">
				<view class="uni-tip-title">警告</view>
				<view class="uni-tip-content">这是一个通过自定义 popup，自由扩展的警告弹窗。点击遮罩不会关闭弹窗。</view>
				<view class="uni-tip-group-button">
					<view class="uni-tip-button" @click="cancel()">取消</view>
					<view class="uni-tip-button" @click="cancel()">确定</view>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import { uniCard, uniPopup, uniIcon, uniCalendar } from '@dcloudio/uni-ui'

	export default {

		name: 'Demo',

		components: {
			uniCard,
			uniPopup,
			uniIcon,
			uniCalendar
		},

		data() {
			return {
				// card data
				cardOperations: ['like', 'comment', 'save'],

				// popup data
				show: false,
				type: '',
				content: ''
			}
		},

		// 监听页面加载，其参数为上个页面传递的数据，参数类型为Object（用于页面传参）
		onLoad(option) {
			console.log(uni.getSystemInfoSync())
		},

		// 监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
		onShow() {
			console.log('page show')
		},

		// 监听页面隐藏
		onHide() {
			console.log('page hide')
		},

		// 监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
		onReady() {
			console.log('page ready')
		},

		// 监听页面卸载
		onUnload() {
			console.log('page unload')
		},

		// 监听用户下拉动作，一般用于下拉刷新
		onPullDownRefresh() {
			console.log('page pullDown')
		},

		// 页面上拉触底事件的处理函数
		onReachBottom() {
			console.log('page reachBottom')
		},

		// 点击 tab 时触发，参数为Object
		onTabItemTap({ index, pagePath, text }) {
			// demo - 被点击tabItem的序号，从0开始
			// pagePath - 被点击tabItem的页面路径
			// text - 被点击tabItem的按钮文字
			console.log('page tap tab')
		},

		// 监听页面滚动，参数为Object
		onPageScroll(scrollTop) {
			// scrollTop - 页面在垂直方向已滚动的距离（单位px）
			console.log('page scroll')
		},

		methods: {
			clickCard() {
				/**
				 * 条件编译
				 * %PLATFORM% 常用取值：
				 * APP-PLUS、H5、MP-WEIXIN、MP(微信小程序/支付宝小程序/百度小程序/头条小程序/QQ小程序)
				 * */
				/* 如下代码不会在 H5 和 5+App 平台上出现 */
				// #ifndef H5 || APP-PLUS
				uni.showToast({
					title: '点击卡片',
					icon: 'success'
				})
				// #endif

				/* 如下代码仅在 H5 下出现 */
				// #ifdef H5
				uni.showToast({
					title: 'H5平台的点击',
					icon: 'success'
				})
				// #endif

				/* 如下代码仅在 5+App 下出现 */
				// #ifdef APP-PLUS
				uni.navigateTo({ url: '/pages/web-view-local/web-view-local' })
				// #endif

			},

			footerClick(types) {
				uni.showToast({
					title: types,
					icon: 'none'
				})
			},

			togglePopup(type, open) {
				switch (type) {
					case 'top':
						this.content = '顶部弹出 popup'
						break
					case 'bottom':
						this.content = '底部弹出 popup'
						break
					case 'center':
						this.content = '居中弹出 popup'
						break
				}
				this.type = type
				if(open === 'tip') {
					this.show = true
				} else {
					this.$refs[open].open()
				}
			},

			handleChange(e) { console.log(e.show) },

			// 点击日历
			calendarChange(e) { console.log(e) },

			cancel() {
				this.show = false
			}
		}
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

	.uni-card-body {
		&-image {
			width: 100%;
			height: 350rpx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}

	/*自定义弹层*/
	.uni-tip {
		padding: 15px;
		width: 300px;
		background-color: #FFFFFF;
		border-radius: 10px;
		&-title {
			text-align: center;
			font-weight: bold;
			font-size: 16px;
			color: #333;
		}
		&-content {
			padding: 15px;
			font-size: 14px;
			color: #666666;
		}
		&-group-button {
			display: flex;
			margin-top: 10px;
		}
		&-button {
			width: 100%;
			text-align: center;
			font-size: 14px;
			color: #3b4144;
		}
		/*  #ifdef H5  */
		&-content, &-title, &-button {
			color: #009688;
		}
		/*  #endif  */
	}
</style>
