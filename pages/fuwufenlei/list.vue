<template>
<!-- category 1 -->
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
		<view class="content">
			<view :style='{"minHeight":"100%","padding":"0 20rpx 20rpx 20rpx","flexWrap":"wrap","background":"#F4F4F4","display":"flex","width":"100%","position":"relative","height":"auto"}'>
				<view class="cu-bar bg-white search" :style='{"padding":"20rpx 0 0 0","margin":"0","background":"none","display":"flex","width":"100%","position":"relative","height":"auto","order":"1"}'>
					<view :style='{"border":"2rpx solid #91DBE8","margin":"0","borderRadius":"20rpx","flex":"1","background":"#fff","lineHeight":"80rpx","position":"relative","height":"80rpx"}' class="search-form round">
						<text class="icon iconfont icon-fangdajing07" :style='{"color":"rgb(153, 153, 153)","left":"0px","textAlign":"center","width":"80rpx","fontSize":"40rpx","lineHeight":"80rpx","position":"absolute","right":"0px"}'></text>
						<input placeholder-style="color: #333" :style='{"border":"0","padding":"12rpx 20rpx 12rpx 80rpx","color":"#333","borderRadius":"40rpx","background":"none","width":"100%","lineHeight":"80rpx","fontSize":"28rpx","height":"80rpx"}' v-model="searchForm.fuwufenlei" type="text" placeholder="服务分类" ></input>
					</view>
					<button :style='{"border":"0","padding":"0px","margin":"0","color":"#fff","right":"0px","borderRadius":"20rpx","top":"20rpx","background":"linear-gradient( 104deg, #91DBE8 0%, #F5C3E5 100%)","width":"136rpx","lineHeight":"80rpx","fontSize":"28rpx","position":"absolute","height":"80rpx","zIndex":"99"}' @tap="search" class="cu-btn shadow-blur round">搜索</button>
				</view>
			

				<view :style='{"width":"100%","margin":"20rpx 0","flexWrap":"wrap","display":"flex","order":"4"}'>
					<view @click="sortClick('addtime')" :style='{"border":"2rpx solid rgb(153, 152, 152)","padding":"0 12rpx","margin":"0 20rpx 0 0","outline":"0","borderRadius":"8rpx","display":"flex"}'>
						<text :style='{"color":"#333","lineHeight":"48rpx","fontSize":"24rpx"}'>按日期</text>
						<text v-if="listSort!='addtime'" class="icon iconfont icon-shijian18" :style='{"margin":"0 4rpx 0 0","lineHeight":"48rpx","fontSize":"24rpx","color":"#333"}'></text>
						<text v-else-if="listSort=='addtime'&&listOrder=='asc'" class="icon iconfont icon-shijian18" :style='{"margin":"0 4rpx 0 0","lineHeight":"48rpx","fontSize":"24rpx","color":"#333"}'></text>
						<text v-else-if="listSort=='addtime'&&listOrder=='desc'" class="icon iconfont icon-shijian18" :style='{"margin":"0 4rpx 0 0","lineHeight":"48rpx","fontSize":"24rpx","color":"#333"}'></text>
					</view>
				</view>
				<view :style='{"width":"100%","flexWrap":"wrap","background":"none","display":"flex","height":"auto","order":"5"}'>
			
			
					<!-- 样式4 -->
					<view v-if="list.length" class="list-box5" :style='{"width":"100%","padding":"20rpx","margin":"0","background":"#fff","height":"auto"}'>
						<block v-for="(product,index) in list" :key="index">
							<view v-if="index%2==0" class="list-item" :style='{"boxShadow":"none","padding":"12rpx","margin":"0 0 20rpx","flexWrap":"wrap","borderWidth":"2rpx","borderImage":"linear-gradient(180deg, rgba(145.00000655651093, 219.0000021457672, 232.00000137090683, 1), rgba(245.00000059604645, 195.0000035762787, 229.00000154972076, 1)) 1 1","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}'>
					
								<view class="list-item-body" :style='{"width":"calc(100% - 200rpx)","padding":"0","margin":"0","height":"auto"}' @tap="onDetailTap(product)">
									<view :style='{"padding":"0 20rpx"}'>
										<text class="icon iconfont icon-shijian21" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
										<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{product.addtime.replace(/\-/g,'-').replace(/\:/g,':')}}</text>
									</view>
								</view>
								<!-- #ifdef MP-WEIXIN -->
								<view :style='{"width":"100%","padding":"8rpx 20rpx","justifyContent":"space-between","display":"flex","height":"auto"}'>
									<view :style='{"padding":"4rpx 8rpx","background":"linear-gradient( 90deg, #F5C3E5 0%, #91DBE8 100%)","display":"flex"}' v-if="(userid && isAuth('fuwufenlei','修改')) || (!userid && isAuthFront('fuwufenlei','修改'))" @tap.stop.proevent="onUpdate" :data-row="product">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-edit"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>修改</text>
									</view>
									<view :style='{"padding":"4rpx 8rpx","background":"#91DBE8","display":"flex"}' v-if="(userid && isAuth('fuwufenlei','删除')) || (!userid && isAuthFront('fuwufenlei','删除'))" @tap.stop.proevent="onDelete" :data-row="product">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-delete"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>删除</text>
									</view>
								</view>
								<!-- #endif -->
								<!-- #ifndef MP-WEIXIN -->
								<view :style='{"width":"100%","padding":"8rpx 20rpx","justifyContent":"space-between","display":"flex","height":"auto"}'>
									<view :style='{"padding":"4rpx 8rpx","background":"linear-gradient( 90deg, #F5C3E5 0%, #91DBE8 100%)","display":"flex"}' v-if="(userid && isAuth('fuwufenlei','修改')) || (!userid && isAuthFront('fuwufenlei','修改'))" @tap.stop.proevent="onUpdateTap(product)">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-edit"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>修改</text>
									</view>
									<view :style='{"padding":"4rpx 8rpx","background":"#91DBE8","display":"flex"}' v-if="(userid && isAuth('fuwufenlei','删除')) || (!userid && isAuthFront('fuwufenlei','删除'))" @tap.stop.proevent="onDeleteTap(product.id)">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-delete"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>删除</text>
									</view>
								</view>
								<!-- #endif -->
							</view>
							<view v-if="index%2==1" class="list-item" :style='{"boxShadow":"none","padding":"12rpx","margin":"0 0 20rpx","flexWrap":"wrap","borderWidth":"2rpx","borderImage":"linear-gradient(180deg, rgba(145.00000655651093, 219.0000021457672, 232.00000137090683, 1), rgba(245.00000059604645, 195.0000035762787, 229.00000154972076, 1)) 1 1","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' @tap="onDetailTap(product)">
								<view class="list-item-body" :style='{"width":"calc(100% - 200rpx)","padding":"0","margin":"0","height":"auto"}'>
									<view :style='{"padding":"0 20rpx"}'>
										<text class="icon iconfont icon-shijian21" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
										<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{product.addtime.replace(/\-/g,'-').replace(/\:/g,':')}}</text>
									</view>
								</view>
					
					
								<!-- #ifdef MP-WEIXIN -->
								<view :style='{"width":"100%","padding":"8rpx 20rpx","justifyContent":"space-between","display":"flex","height":"auto"}'>
									<view :style='{"padding":"4rpx 8rpx","background":"linear-gradient( 90deg, #F5C3E5 0%, #91DBE8 100%)","display":"flex"}' v-if="(userid && isAuth('fuwufenlei','修改')) || (!userid && isAuthFront('fuwufenlei','修改'))" @tap.stop.proevent="onUpdate" :data-row="product">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-edit"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>修改</text>
									</view>
									<view :style='{"padding":"4rpx 8rpx","background":"#91DBE8","display":"flex"}' v-if="(userid && isAuth('fuwufenlei','删除')) || (!userid && isAuthFront('fuwufenlei','删除'))" @tap.stop.proevent="onDelete" :data-row="product">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-delete"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>删除</text>
									</view>
								</view>
								<!-- #endif -->
								<!-- #ifndef MP-WEIXIN -->
								<view :style='{"width":"100%","padding":"8rpx 20rpx","justifyContent":"space-between","display":"flex","height":"auto"}'>
									<view :style='{"padding":"4rpx 8rpx","background":"linear-gradient( 90deg, #F5C3E5 0%, #91DBE8 100%)","display":"flex"}' v-if="(userid && isAuth('fuwufenlei','修改')) || (!userid && isAuthFront('fuwufenlei','修改'))" @tap.stop.proevent="onUpdateTap(product)">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-edit"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>修改</text>
									</view>
									<view :style='{"padding":"4rpx 8rpx","background":"#91DBE8","display":"flex"}' v-if="(userid && isAuth('fuwufenlei','删除')) || (!userid && isAuthFront('fuwufenlei','删除'))" @tap.stop.proevent="onDeleteTap(product.id)">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-delete"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>删除</text>
									</view>
								</view>
								<!-- #endif -->
							</view>
						</block>
					</view>
			


			
			
			
			
				</view>
				<button :style='{"border":"0","boxShadow":"0 2rpx 12rpx rgba(0,0,0,.3)","margin":"20rpx ","color":"rgb(255, 255, 255)","outline":"none","borderRadius":"20rpx","background":"linear-gradient( 104deg, #91DBE8 0%, #F5C3E5 100%)","width":"120rpx","lineHeight":"70rpx","fontSize":"28rpx","position":"relative","height":"70rpx","zIndex":"1","order":"3"}' v-if="userid && isAuth('fuwufenlei','新增')" class="add-btn" @click="onAddTap()">新增</button>
				<button :style='{"border":"0","boxShadow":"0 2rpx 12rpx rgba(0,0,0,.3)","margin":"20rpx ","color":"rgb(255, 255, 255)","outline":"none","borderRadius":"20rpx","background":"linear-gradient( 104deg, #91DBE8 0%, #F5C3E5 100%)","width":"120rpx","lineHeight":"70rpx","fontSize":"28rpx","position":"relative","height":"70rpx","zIndex":"1","order":"3"}' v-if="!userid && isAuthFront('fuwufenlei','新增')" class="add-btn" @click="onAddTap()">新增</button>
			</view>
		</view>
	</mescroll-uni>
</template>

<script>
	export default {
		data() {
			return {
				btnColor: ['#409eff','#67c23a','#909399','#e6a23c','#f56c6c','#356c6c','#351c6c','#f093a9','#a7c23a','#104eff','#10441f','#a21233','#503319'],
				list: [],
				lists: [],
                userid: '',
				mescroll: null, //mescroll实例对象
				downOption: {
					auto: false //是否在初始化后,自动执行下拉回调callback; 默认true
				},
				upOption: {
					noMoreSize: 5, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					textNoMore: '~ 没有更多了 ~',
				},
				hasNext: true,
				searchForm:{
					fuwufenlei: '',
				},
				CustomBar: '0',
				listSort: 'id',
				listOrder: 'desc',
				screenBoxShow: false,
			};
		},
		watch: {
		},
		mounted() {
		},
		computed: {
			baseUrl() {
				return this.$base.url;
			},
		},
		async onShow() {
			this.btnColor = this.btnColor.sort(()=> {
				return (0.5-Math.random());
			});
			this.hasNext = true
			// 重新加载数据
			if (this.mescroll) this.mescroll.resetUpScroll()
		},
		async onLoad(options) {
            if(options.userid) {
                this.userid=options.userid;
            } else {
                this.userid = "";
            }
			this.hasNext = true
			// 重新加载数据
			// if (this.mescroll) this.mescroll.resetUpScroll()
		},
		components: {
		},
		methods: {
			screenReset(){
				this.searchForm = {}
				this.search()
				this.$forceUpdate()
			},
			uGetRect(selector, all) {
				return new Promise(resolve => {
					uni.createSelectorQuery()
					.in(this)
					[all ? 'selectAll' : 'select'](selector)
					.boundingClientRect(rect => {
						if (all && Array.isArray(rect) && rect.length) {
							resolve(rect);
						}
						if (!all && rect) {
							resolve(rect);
						}
					})
					.exec();
				});
			},
			cloneData(data) {
				return JSON.parse(JSON.stringify(data));
			},
			sortClick(type){
				if(this.listSort==type){
					if(this.listOrder == 'desc'){
						this.listOrder = 'asc'
					}else{
						this.listOrder = 'desc'
					}
				}else{
					this.listSort = type
					this.listOrder = 'desc'
				}
				this.search()
			},
            priceChange(price) {
                return Number(price).toFixed(2);
            },
            preHttp(str) {
                return str && str.substr(0,4)=='http';
            },
			//类别搜索
			// mescroll组件初始化的回调,可获取到mescroll对象
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
			/*下拉刷新的回调 */
			downCallback(mescroll) {
				this.hasNext = true
				// 重置分页参数页数为1
				mescroll.resetUpScroll()
			},
			/*上拉加载的回调: mescroll携带page的参数, 其中num:当前页 从1开始, size:每页数据条数,默认10 */
			async upCallback(mescroll) {
				let params = {
					page: mescroll.num,
					limit: mescroll.size,
				}
				params['sort'] = this.listSort;
				params['order'] = this.listOrder;

				if(this.searchForm.fuwufenlei){
					params['fuwufenlei'] = '%' + this.searchForm.fuwufenlei + '%'
				}
				let user = uni.getStorageSync("appUserid")?JSON.parse(uni.getStorageSync('userSession')):{}
                let res = {}
                if(this.userid) {
                    res = await this.$api.page(`fuwufenlei`, params);
                } else {
                    res = await this.$api.list(`fuwufenlei`, params);
                }

				// 如果是第一页数据置空
				if (mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				this.$forceUpdate()
				
				let length = Math.ceil(this.list.length/6)
				let arr = [];
				for (let i = 0; i<length; i++){
					arr[i] = this.list.slice(i*6, (i+1)*6)
				}
				this.lists = arr
				if (res.data.list.length == 0) this.hasNext = false;
				mescroll.endSuccess(mescroll.size, this.hasNext);
			},
			// 详情
			onDetailTap(item) {
                uni.setStorageSync("useridTag",this.userid);
				this.$utils.jump(`./detail?id=${item.id}&userid=`+this.userid)
			},
			onUpdate(e){
				this.onUpdateTap(e.currentTarget.dataset.row)
			},
			// 修改
			onUpdateTap(row){
                uni.setStorageSync("useridTag",this.userid);
				this.$utils.jump(`./add-or-update?id=${row.id}`)
			},
			// 添加
			onAddTap(){
                uni.setStorageSync("useridTag",this.userid);
				this.$utils.jump(`./add-or-update`)
			},
			onDelete(e){
				this.onDeleteTap(e.currentTarget.dataset.row.id)
			},
			onDeleteTap(id){
				var _this = this;
				uni.showModal({
					title: '提示',
					content: '是否确认删除',
					success: async function(res) {
						if (res.confirm) {
							await _this.$api.del('fuwufenlei', JSON.stringify([id]));
							_this.$utils.msg('删除成功');
							_this.hasNext = true
							// 重置分页参数页数为1
							_this.search()
						}
					}
				});
			},
			// 搜索
			async search(){
				this.mescroll.num = 1
				let searchForm = {
					page: this.mescroll.num,
					limit: this.mescroll.size,
				}
				searchForm['sort'] = this.listSort;
				searchForm['order'] = this.listOrder;

				if(this.searchForm.fuwufenlei){
					searchForm['fuwufenlei'] = '%' + this.searchForm.fuwufenlei + '%'
				}
                let res = {};
                if(this.userid) {
                    res = await this.$api.page(`fuwufenlei`, searchForm);
                } else {
                    res = await this.$api.list(`fuwufenlei`, searchForm);
                }
				// 如果是第一页数据置空
				if (this.mescroll.num == 1) this.list = [];
				this.list = this.list.concat(res.data.list);
				
				let length = Math.ceil(this.list.length/6)
				let arr = [];
				for (let i = 0; i<length; i++){
					arr[i] = this.list.slice(i*6, (i+1)*6)
				}
				this.lists = arr
				if (res.data.list.length == 0) this.hasNext = false;
				this.mescroll.endSuccess(this.mescroll.size, this.hasNext);
				this.screenBoxShow = false
			}
		}
	};
</script>

<style lang="scss" scoped>
	.content {
		min-height: calc(100vh - 44px);
		box-sizing: border-box;
	}
	.category-one .tab {
		cursor: pointer;
		border-radius: 10rpx;
		padding: 0 20rpx;
		margin: 0 12rpx 12rpx 0;
		color: #000;
		background: #FFFFFF;
		flex: none;
		display: inline-block;
		width: auto;
		font-size: 28rpx;
		line-height: 60rpx;
		height: 60rpx;
	}
	
	.category-one .tab.active {
		cursor: pointer;
		border-radius: 10rpx;
		padding: 0 20rpx;
		margin: 0 12rpx 0 0;
		color: #fff;
		background: linear-gradient( 135deg, #91DBE8 0%, #F5C3E5 100%);
		flex: none;
		display: inline-block;
		width: auto;
		font-size: 28rpx;
		line-height: 60rpx;
		height: 60rpx;
	}
</style>
