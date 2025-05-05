<template>
	<view :style='{"minHeight":"100%","width":"100%","padding":"24rpx","position":"relative","background":"#F4F4F4","height":"auto"}'>
		<view class="title" :style='{"lineHeight":"1.5","fontSize":"32rpx","color":"#000000","textAlign":"center","background":"#FFFFFF","fontWeight":"600"}'>{{detail.title}}</view>
		
		<view :style='{"padding":"0 0 12rpx 0","borderColor":"#C4C4C4","alignItems":"center","borderWidth":"0 0 2rpx 0","background":"#FFFFFF","display":"flex","width":"100%","borderStyle":"solid","justifyContent":"center"}'>
		  <view :style='{"padding":"0"}'>
		    <text class="icon iconfont icon-shijian21" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
		    <text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>发布时间：{{detail.addtime}}</text>
		  </view>
		  <view :style='{"padding":"0"}'>
		    <text class="icon iconfont icon-geren16" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
		    <text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{detail.name}}</text>
		  </view>
		  <view :style='{"padding":"0"}'>
		    <text class="icon iconfont icon-zan10" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
		    <text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{detail.thumbsupnum}}</text>
		  </view>
		  <view :style='{"padding":"0"}'>
		    <text class="icon iconfont icon-shoucang10" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
		    <text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{detail.storeupnum}}</text>
		  </view>
		  <view :style='{"padding":"0"}'>
		    <text class="icon iconfont icon-chakan9" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
		    <text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{detail.clicknum}}</text>
		  </view>
		</view>
		
		<view :style='{"padding":"20rpx","margin":"0","background":"#FFFFFF","justifyContent":"space-between","display":"flex"}'>
		  <view :style='{"padding":"4rpx 40rpx","borderRadius":"10rpx","color":"#fff","background":"linear-gradient( 135deg, #91DBE8 0%, #F5C3E5 100%)","display":"flex"}' @click="likeClick">
		    <text class="icon iconfont" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"28rpx","color":"inherit"}' :class="likeType?'icon-zan10':'icon-zan10'"></text>
		    <text :style='{"color":"inherit","lineHeight":"1.5","fontSize":"28rpx"}'>{{likeType?'已':''}}赞</text>
		  </view>
		  <view :style='{"padding":"4rpx 40rpx","borderRadius":"10rpx","color":"#fff","background":"#91DBE8","display":"flex"}' @click="collectClick">
		    <text class="icon iconfont" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"28rpx","color":"inherit"}' :class="collectType?'icon-shoucang10':'icon-shoucang10'"></text>
		    <text :style='{"color":"inherit","lineHeight":"1.5","fontSize":"28rpx"}'>{{collectType?'已':''}}收藏</text>
		  </view>
		</view>
		
		<view class="content" :style='{"width":"100%","padding":"0 20rpx","background":"#FFFFFF","height":"auto"}'>
			<rich-text :nodes="detail.content"></rich-text>
		</view>
		
		<div :style='{"padding":"20rpx 40rpx","background":"#FFFFFF","display":"flex","gap":"20rpx","width":"100%","justifyContent":"center","height":"auto"}'>
		  <div @click="prepDetailClick" :style='{"padding":"0 20rpx","lineHeight":"66rpx","fontSize":"28rpx","color":"#fff","borderRadius":"8rpx","background":"linear-gradient( 135deg, #91DBE8 0%, #F5C3E5 100%)"}'>上一篇：prev</div>
		  <div @click="nextDetailClick" :style='{"padding":"0 20rpx","lineHeight":"66rpx","fontSize":"28rpx","color":"#fff","borderRadius":"8rpx","background":"#91DBE8"}'>下一篇：next</div>
		</div>
		

		<!-- 热门 -->
		<view class="hot" :style='{"width":"100%","padding":"0 0 40rpx 0","margin":"40rpx 0 0","background":"#fff","height":"auto"}'>
		  <view :style='{"padding":"40rpx 0 0","margin":"0 auto","background":"url(http://codegen.caihongy.cn/20250220/e4932683bd0f445e99172e4e3dbddcd5.png) no-repeat center bottom","display":"flex","width":"calc(100% - 40rpx)","fontSize":"32rpx","justifyContent":"center","fontWeight":"600","height":"140rpx"}'>热门信息</view>
		  <view :style='{"padding":"0","margin":"40rpx 0 0","flexWrap":"wrap","background":"none","display":"flex","gap":"20rpx","width":"100%","justifyContent":"space-between","height":"auto"}'>
		    <view v-for="(item,index) in hotList" :key="index" :style='{"border":"none","padding":"20rpx","alignItems":"center","background":"url(http://codegen.caihongy.cn/20250220/35fd8e5a5c3543d6b3953b2a4666bcc8.png) no-repeat center / 100% 100%","flexDirection":"column","display":"flex","width":"48%","position":"relative","justifyContent":"center","height":"auto"}' @click="toDetail(item.id)">
			  <image :style='{"border":"4rpx solid #fff","width":"100%","objectFit":"cover","borderRadius":"0","display":"block","height":"160rpx"}' mode="aspectFill" :src="baseUrl + item.picture"></image>
		      <view :style='{"padding":"0","overflow":"hidden","whiteSpace":"nowrap","color":"#fff","maxHeight":"80rpx","textAlign":"center","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","textOverflow":"ellipsis"}'>{{ item.title }}</view>
		      <view :style='{"padding":"12rpx","lineHeight":"24rpx","fontSize":"24rpx","color":"#fff","textAlign":"center","background":"none"}'>{{ item.addtime }}</view>
		    </view>
		  </view>
		</view>
		<!-- 推荐 -->
		<view class="recommend" :style='{"width":"100%","padding":"0 0 40rpx 0","margin":"40rpx 0 0","background":"#fff","height":"auto"}'>
		  <view :style='{"padding":"40rpx 0 0","margin":"0","background":"url(http://codegen.caihongy.cn/20250220/e4932683bd0f445e99172e4e3dbddcd5.png) no-repeat center bottom","display":"flex","width":"100%","fontSize":"32rpx","justifyContent":"center","fontWeight":"600","height":"140rpx"}'>推荐信息</view>
		  <view :style='{"padding":"0","margin":"40rpx 0 0","flexWrap":"wrap","background":"none","display":"flex","gap":"20rpx","width":"100%","justifyContent":"space-between","height":"auto"}'>
		    <view v-for="(item,index) in recommendList" :key="index" :style='{"border":"none","padding":"20rpx","alignItems":"center","background":"url(http://codegen.caihongy.cn/20250220/35fd8e5a5c3543d6b3953b2a4666bcc8.png) no-repeat center / 100% 100%","flexDirection":"column","display":"flex","width":"48%","position":"relative","justifyContent":"center","height":"auto"}' @click="toDetail(item.id)">
		      <image :style='{"border":"4rpx solid #fff","width":"100%","objectFit":"cover","borderRadius":"0","display":"block","height":"160rpx"}' mode="aspectFill" :src="baseUrl + item.picture"></image>
			  <view :style='{"padding":"0","overflow":"hidden","whiteSpace":"nowrap","color":"#fff","maxHeight":"80rpx","textAlign":"center","width":"100%","lineHeight":"40rpx","fontSize":"28rpx","textOverflow":"ellipsis"}'>{{ item.title }}</view>
		      <view :style='{"padding":"12rpx","lineHeight":"24rpx","fontSize":"24rpx","color":"#fff","textAlign":"center","background":"none"}'>{{ item.addtime }}</view>
		    </view>
		  </view>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				detail: {},
				id: '',
				likeType: false,
				likeForm: {},
				collectType: false,
				collectForm: {},
				allList: [],
				currentIndex: 0,
				hotList: [],
				recommendList: [],
			}
		},
		async onLoad(options) {
			this.id = options.id;
			this.getInfo()
			
			this.getHotList()
			this.getRecommendList()
		},
		computed:{
			baseUrl() {
				return this.$base.url;
			},
			userid(){
				return uni.getStorageSync('appUserid')
			}
		},
		methods: {
			async getInfo(){
				let res = await this.$api.info('news', this.id)
				res.data.content = res.data.content.replace(/<img/g,'<img style="width: 100%;"');
				this.detail = res.data;
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 100,
				})
				this.getLike()
				this.getCollect()
				res = await this.$api.list('news',{page:1,limit:100,sort:'addtime',order:'desc'})
				for(let x in res.data.list){
					if(res.data.list[x].id == this.id){
						this.currentIndex = Number(x)
						break
					}
				}
				this.allList = res.data.list
				
			},
			// 获取点赞状态
			async getLike() {
				let res = await this.$api.list('storeup', {
					page: 1,
					limit: 1,
					type: '21',
					userid: uni.getStorageSync('appUserid'),
					refid: this.id,
					tablename: 'news'
				})
				if (res.data.list.length) {
					this.likeType = true
					this.likeForm = res.data.list[0]
				} else {
					this.likeType = false
					this.likeForm = {}
				}
			},
			// 获取热门列表
			async getHotList(){
				let res = await this.$api.recommend('news',{page:1, limit: 4,sort:'addtime',order:'desc'})
				this.hotList = res.data.list;
			},
			// 获取推荐列表	
			async getRecommendList(){
				let res;
				if(uni.getStorageSync("appUserid")){
					res = await this.$api.recommend2('news',{page:1, limit: 4,sort:'addtime',order:'desc'})
				}else{
					res = await this.$api.recommend('news',{page:1, limit: 4,sort:'addtime',order:'desc'})
				}
				
				this.recommendList = res.data.list;
			},
			// 上一篇
			prepDetailClick(){
				if(this.currentIndex == 0){
					this.$utils.msg('已经是第一篇了')
					return false
				}
				this.currentIndex--
				this.id = this.allList[this.currentIndex].id
				this.getInfo()
			},
			// 下一篇
			nextDetailClick(){
				if(this.currentIndex == this.allList.length - 1){
					this.$utils.msg('已经是最后一篇了')
					return false
				}
				this.currentIndex++
				this.id = this.allList[this.currentIndex].id
				this.getInfo()
			},
			toDetail(id){
				this.id = id
				this.getInfo()
			},
			// 获取收藏状态
			async getCollect() {
				let res = await this.$api.list('storeup', {
					page: 1,
					limit: 1,
					type: '1',
					userid: uni.getStorageSync('appUserid'),
					refid: this.id,
					tablename: 'news'
				})
				if (res.data.list.length) {
					this.collectType = true
					this.collectForm = res.data.list[0]
				} else {
					this.collectType = false
					this.collectForm = {}
				}
			},
			// 点赞按钮
			async likeClick() {
				let that = this
				if (this.likeType) {
					uni.showModal({
						title: '提示',
						content: '是否取消点赞？',
						async success(res) {
							if (res.confirm) {
								await that.$api.del('storeup', JSON.stringify([that.likeForm.id]))
								that.$utils.msg('取消成功')
								that.detail.thumbsupnum--
								await that.$api.update('news', that.detail)
								that.getLike()
							}
						}
					})
				} else {
					await that.$api.add('storeup', {
						userid: uni.getStorageSync('appUserid'),
						refid: this.id,
						type: '21',
						name: this.detail.title,
						picture: this.detail.picture,
						tablename: 'news',
					})
					this.$utils.msg('点赞成功')
					that.detail.thumbsupnum++
					await that.$api.update('news', that.detail)
					this.getLike()
				}
			},
			// 收藏按钮
			async collectClick() {
				let that = this
				if (this.collectType) {
					uni.showModal({
						title: '提示',
						content: '是否取消收藏？',
						async success(res) {
							if (res.confirm) {
								await that.$api.del('storeup', JSON.stringify([that.collectForm.id]))
								that.$utils.msg('取消成功')
								that.detail.storeupnum--
								await that.$api.update('news', that.detail)
								that.getCollect()
							}
						}
					})
				} else {
					await that.$api.add('storeup', {
						userid: uni.getStorageSync('appUserid'),
						refid: this.id,
						type: '1',
						name: this.detail.title,
						picture: this.detail.picture,
						tablename: 'news',
					})
					this.$utils.msg('收藏成功')
					that.detail.storeupnum++
					await that.$api.update('news', that.detail)
					this.getCollect()
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	page {
		background: #FFFFFF;
	}
</style>
