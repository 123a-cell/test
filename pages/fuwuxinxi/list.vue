<template>
<!-- category 1 -->
	<mescroll-uni @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
		<view class="content">
			<view :style='{"minHeight":"100%","padding":"0 20rpx 20rpx 20rpx","flexWrap":"wrap","background":"#F4F4F4","display":"flex","width":"100%","position":"relative","height":"auto"}'>
				<view class="cu-bar bg-white search" :style='{"padding":"20rpx 0 0 0","margin":"0","background":"none","display":"flex","width":"100%","position":"relative","height":"auto","order":"1"}'>
					<view :style='{"border":"2rpx solid #91DBE8","margin":"0","borderRadius":"20rpx","flex":"1","background":"#fff","lineHeight":"80rpx","position":"relative","height":"80rpx"}' class="search-form round">
						<text class="icon iconfont icon-fangdajing07" :style='{"color":"rgb(153, 153, 153)","left":"0px","textAlign":"center","width":"80rpx","fontSize":"40rpx","lineHeight":"80rpx","position":"absolute","right":"0px"}'></text>
						<input placeholder-style="color: #333" :style='{"border":"0","padding":"12rpx 20rpx 12rpx 80rpx","color":"#333","borderRadius":"40rpx","background":"none","width":"100%","lineHeight":"80rpx","fontSize":"28rpx","height":"80rpx"}' v-model="searchForm.fuwumingcheng" type="text" placeholder="服务名称" ></input>
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
					<scroll-view scroll-x="true" class="category-one" :style='{"padding":"0","margin":"0","whiteSpace":"nowrap","borderRadius":"0 0 20rpx 20rpx","background":"none","flexDirection":"row","display":"flex","width":"100%","height":"auto"}'>
						<view :class='categoryName === item.fuwufenlei ? "active" : ""' class="tab" v-for="(item,index) in categoryList" :key="index" @tap="categoryClick(item.fuwufenlei)">{{item.fuwufenlei}}</view>
					</scroll-view>
			
			
					<!-- 样式4 -->
					<view v-if="list.length" class="list-box5" :style='{"width":"100%","padding":"20rpx","margin":"0","background":"#fff","height":"auto"}'>
						<block v-for="(product,index) in list" :key="index">
							<view v-if="index%2==0" class="list-item" :style='{"boxShadow":"none","padding":"12rpx","margin":"0 0 20rpx","flexWrap":"wrap","borderWidth":"2rpx","borderImage":"linear-gradient(180deg, rgba(145.00000655651093, 219.0000021457672, 232.00000137090683, 1), rgba(245.00000059604645, 195.0000035762787, 229.00000154972076, 1)) 1 1","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}'>
								<image :style='{"width":"200rpx","objectFit":"cover","display":"block","height":"200rpx"}' mode="aspectFill" v-if="preHttp(product.tupian)" :src="product.tupian"></image>
								<image :style='{"width":"200rpx","objectFit":"cover","display":"block","height":"200rpx"}' mode="aspectFill" v-else :src="product.tupian?baseUrl+product.tupian.split(',')[0]:''"></image>
					
								<view class="list-item-body" :style='{"width":"calc(100% - 200rpx)","padding":"0","margin":"0","height":"auto"}' @tap="onDetailTap(product)">
									<view :style='{"padding":"0 20rpx","margin":"0","color":"#333","width":"100%","lineHeight":"48rpx","fontSize":"28rpx","fontWeight":"600"}' class="title">{{product.fuwumingcheng}}</view>
									<view :style='{"padding":"0 20rpx","margin":"0","color":"#333","width":"100%","lineHeight":"48rpx","fontSize":"28rpx","fontWeight":"600"}' class="title">{{product.fuwufenlei}}</view>
									<view :style='{"padding":"0 20rpx"}'>
										<text class="icon iconfont icon-shijian21" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
										<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{product.addtime.replace(/\-/g,'-').replace(/\:/g,':')}}</text>
									</view>
								</view>
								<!-- #ifdef MP-WEIXIN -->
								<view :style='{"width":"100%","padding":"8rpx 20rpx","justifyContent":"space-between","display":"flex","height":"auto"}'>
									<view :style='{"padding":"4rpx 8rpx","background":"linear-gradient( 90deg, #F5C3E5 0%, #91DBE8 100%)","display":"flex"}' v-if="(userid && isAuth('fuwuxinxi','修改')) || (!userid && isAuthFront('fuwuxinxi','修改'))" @tap.stop.proevent="onUpdate" :data-row="product">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-edit"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>修改</text>
									</view>
									<view :style='{"padding":"4rpx 8rpx","background":"#91DBE8","display":"flex"}' v-if="(userid && isAuth('fuwuxinxi','删除')) || (!userid && isAuthFront('fuwuxinxi','删除'))" @tap.stop.proevent="onDelete" :data-row="product">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-delete"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>删除</text>
									</view>
								</view>
								<!-- #endif -->
								<!-- #ifndef MP-WEIXIN -->
								<view :style='{"width":"100%","padding":"8rpx 20rpx","justifyContent":"space-between","display":"flex","height":"auto"}'>
									<view :style='{"padding":"4rpx 8rpx","background":"linear-gradient( 90deg, #F5C3E5 0%, #91DBE8 100%)","display":"flex"}' v-if="(userid && isAuth('fuwuxinxi','修改')) || (!userid && isAuthFront('fuwuxinxi','修改'))" @tap.stop.proevent="onUpdateTap(product)">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-edit"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>修改</text>
									</view>
									<view :style='{"padding":"4rpx 8rpx","background":"#91DBE8","display":"flex"}' v-if="(userid && isAuth('fuwuxinxi','删除')) || (!userid && isAuthFront('fuwuxinxi','删除'))" @tap.stop.proevent="onDeleteTap(product.id)">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-delete"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>删除</text>
									</view>
								</view>
								<!-- #endif -->
							</view>
							<view v-if="index%2==1" class="list-item" :style='{"boxShadow":"none","padding":"12rpx","margin":"0 0 20rpx","flexWrap":"wrap","borderWidth":"2rpx","borderImage":"linear-gradient(180deg, rgba(145.00000655651093, 219.0000021457672, 232.00000137090683, 1), rgba(245.00000059604645, 195.0000035762787, 229.00000154972076, 1)) 1 1","display":"flex","width":"100%","borderStyle":"solid","height":"auto"}' @tap="onDetailTap(product)">
								<view class="list-item-body" :style='{"width":"calc(100% - 200rpx)","padding":"0","margin":"0","height":"auto"}'>
									<view :style='{"padding":"0 20rpx","margin":"0","color":"#333","width":"100%","lineHeight":"48rpx","fontSize":"28rpx","fontWeight":"600"}' class="title">{{product.fuwumingcheng}}</view>
									<view :style='{"padding":"0 20rpx","margin":"0","color":"#333","width":"100%","lineHeight":"48rpx","fontSize":"28rpx","fontWeight":"600"}' class="title">{{product.fuwufenlei}}</view>
									<view :style='{"padding":"0 20rpx"}'>
										<text class="icon iconfont icon-shijian21" :style='{"margin":"0 4rpx 0 0","lineHeight":"1.5","fontSize":"24rpx","color":"#666"}'></text>
										<text :style='{"color":"#666","lineHeight":"1.5","fontSize":"24rpx"}'>{{product.addtime.replace(/\-/g,'-').replace(/\:/g,':')}}</text>
									</view>
								</view>
					
								<image :style='{"width":"200rpx","objectFit":"cover","display":"block","height":"200rpx"}' mode="aspectFill" v-if="preHttp(product.tupian)" :src="product.tupian"></image>
								<image :style='{"width":"200rpx","objectFit":"cover","display":"block","height":"200rpx"}' mode="aspectFill" v-else :src="product.tupian?baseUrl+product.tupian.split(',')[0]:''"></image>
					
								<!-- #ifdef MP-WEIXIN -->
								<view :style='{"width":"100%","padding":"8rpx 20rpx","justifyContent":"space-between","display":"flex","height":"auto"}'>
									<view :style='{"padding":"4rpx 8rpx","background":"linear-gradient( 90deg, #F5C3E5 0%, #91DBE8 100%)","display":"flex"}' v-if="(userid && isAuth('fuwuxinxi','修改')) || (!userid && isAuthFront('fuwuxinxi','修改'))" @tap.stop.proevent="onUpdate" :data-row="product">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-edit"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>修改</text>
									</view>
									<view :style='{"padding":"4rpx 8rpx","background":"#91DBE8","display":"flex"}' v-if="(userid && isAuth('fuwuxinxi','删除')) || (!userid && isAuthFront('fuwuxinxi','删除'))" @tap.stop.proevent="onDelete" :data-row="product">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-delete"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>删除</text>
									</view>
								</view>
								<!-- #endif -->
								<!-- #ifndef MP-WEIXIN -->
								<view :style='{"width":"100%","padding":"8rpx 20rpx","justifyContent":"space-between","display":"flex","height":"auto"}'>
									<view :style='{"padding":"4rpx 8rpx","background":"linear-gradient( 90deg, #F5C3E5 0%, #91DBE8 100%)","display":"flex"}' v-if="(userid && isAuth('fuwuxinxi','修改')) || (!userid && isAuthFront('fuwuxinxi','修改'))" @tap.stop.proevent="onUpdateTap(product)">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-edit"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>修改</text>
									</view>
									<view :style='{"padding":"4rpx 8rpx","background":"#91DBE8","display":"flex"}' v-if="(userid && isAuth('fuwuxinxi','删除')) || (!userid && isAuthFront('fuwuxinxi','删除'))" @tap.stop.proevent="onDeleteTap(product.id)">
										<text :style='{"margin":"0 8rpx 0 0","fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}' class="cuIcon-delete"></text>
										<text :style='{"fontSize":"28rpx","lineHeight":"1","color":"#fff","display":"inline-block"}'>删除</text>
									</view>
								</view>
								<!-- #endif -->
							</view>
						</block>
					</view>
			


			
			
			
			
				</view>
				<button :style='{"border":"0","boxShadow":"0 2rpx 12rpx #00000030","margin":"20rpx 0 0","color":"#fff","bottom":"0","outline":"none","borderRadius":"20rpx","left":"0","background":"linear-gradient( 104deg, #91DBE8 0%, #F5C3E5 100%)","width":"120rpx","lineHeight":"70rpx","fontSize":"28rpx","position":"relative","height":"70rpx","zIndex":"1","order":"2"}' class="add-btn" @click="screenBoxShow=true">筛</button>
				<button :style='{"border":"0","boxShadow":"0 2rpx 12rpx rgba(0,0,0,.3)","margin":"20rpx ","color":"rgb(255, 255, 255)","outline":"none","borderRadius":"20rpx","background":"linear-gradient( 104deg, #91DBE8 0%, #F5C3E5 100%)","width":"120rpx","lineHeight":"70rpx","fontSize":"28rpx","position":"relative","height":"70rpx","zIndex":"1","order":"3"}' v-if="userid && isAuth('fuwuxinxi','新增')" class="add-btn" @click="onAddTap()">新增</button>
				<button :style='{"border":"0","boxShadow":"0 2rpx 12rpx rgba(0,0,0,.3)","margin":"20rpx ","color":"rgb(255, 255, 255)","outline":"none","borderRadius":"20rpx","background":"linear-gradient( 104deg, #91DBE8 0%, #F5C3E5 100%)","width":"120rpx","lineHeight":"70rpx","fontSize":"28rpx","position":"relative","height":"70rpx","zIndex":"1","order":"3"}' v-if="!userid && isAuthFront('fuwuxinxi','新增')" class="add-btn" @click="onAddTap()">新增</button>
				<view :style='{"top":"0","left":"0","background":"rgba(0, 0, 0, .3)","width":"100%","position":"absolute","height":"100%","zIndex":"665"}' v-if="screenBoxShow" @click="screenBoxShow=false"></view>
				<view class="screenBox" :class="screenBoxShow?'screenBoxActive':''">
					<view :style='{"width":"100%","padding":"20rpx 0 20rpx 0"}'>
						<view :style='{"width":"100%","padding":"0 0 20rpx 20rpx","fontSize":"24rpx"}'>服务价格区间</view>
						<view :style='{"width":"100%","alignItems":"center","flexWrap":"wrap","justifyContent":"center","display":"flex"}'>
							<input :style='{"border":"2rpx solid #91DBE8","borderRadius":"40rpx","textAlign":"center","background":"none","width":"40%","lineHeight":"60rpx","height":"60rpx"}' v-model="searchForm.fuwujiagestart" placeholder="请输入开始服务价格">
							<view :style='{"padding":"0 10rpx","fontSize":"20rpx"}'>-</view>
							<input :style='{"border":"2rpx solid #91DBE8","borderRadius":"40rpx","textAlign":"center","background":"none","width":"40%","lineHeight":"60rpx","height":"60rpx"}' v-model="searchForm.fuwujiageend" placeholder="请输入结束服务价格">
						</view>
					</view>
					<view :style='{"width":"100%","padding":"40rpx 0 0","alignItems":"center","justifyContent":"space-around","display":"flex"}'>
						<div :style='{"color":"#888","borderRadius":"8rpx","textAlign":"center","background":"#EDEDED","width":"40%","lineHeight":"60rpx","height":"60rpx"}' @click="screenReset">重置</div>
						<div :style='{"color":"#fff","borderRadius":"8rpx","textAlign":"center","background":"linear-gradient( 90deg, #F5C3E5 0%, #91DBE8 100%)","width":"40%","lineHeight":"60rpx","height":"60rpx"}' @click="search">搜索</div>
					</view>
				</view>
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
					fuwumingcheng: '',
					fuwujiagestart: '',
					fuwujiageend: '',
				},
				categoryList:[],
				categoryName :'全部',
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
            if(uni.getStorageSync("useridTag")==1){
                this.userid=uni.getStorageSync("useridTag");
                uni.removeStorageSync("useridTag");
            } else {
                this.userid = "";
            }
			this.btnColor = this.btnColor.sort(()=> {
				return (0.5-Math.random());
			});
            let res = {};
            if(this.userid) {
                res = await this.$api.page('fuwufenlei', {page:1,limit:100});
            } else {
                res = await this.$api.list('fuwufenlei', {page:1,limit:100});
            }
			res.data.list.splice(0,0,{id:0,fuwufenlei:'全部'})
			this.categoryList = res.data.list;
			this.hasNext = true
			// 重新加载数据
			if (this.mescroll) this.mescroll.resetUpScroll()
		},
		async onLoad(options) {
            if(uni.getStorageSync("useridTag")==1){
                this.userid=uni.getStorageSync("useridTag");
                uni.removeStorageSync("useridTag");
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
			categoryClick(categoryName){
				this.categoryName = categoryName;
				this.mescroll.resetUpScroll();
			},
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

				if(this.categoryName!='全部'){
					params.fuwufenlei = '%' + this.categoryName + '%'
				}
				if(this.searchForm.fuwumingcheng){
					params['fuwumingcheng'] = '%' + this.searchForm.fuwumingcheng + '%'
				}
				if(this.searchForm.fuwujiage){
					params['fuwujiage'] = '%' + this.searchForm.fuwujiage + '%'
				}
				let user = uni.getStorageSync("appUserid")?JSON.parse(uni.getStorageSync('userSession')):{}
                let res = {}
                if(this.userid) {
                    res = await this.$api.page(`fuwuxinxi`, params);
                } else {
                    res = await this.$api.list(`fuwuxinxi`, params);
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
							await _this.$api.del('fuwuxinxi', JSON.stringify([id]));
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

				if(this.searchForm.fuwumingcheng){
					searchForm['fuwumingcheng'] = '%' + this.searchForm.fuwumingcheng + '%'
				}
				if(this.categoryName!='全部'){
					searchForm.fuwufenlei = '%' + this.categoryName + '%'
				}
				if(this.searchForm.fuwujiagestart){
					searchForm['fuwujiagestart'] = this.searchForm.fuwujiagestart
				}
				if(this.searchForm.fuwujiageend){
					searchForm['fuwujiageend'] = this.searchForm.fuwujiageend
				}
                let res = {};
                if(this.userid) {
                    res = await this.$api.page(`fuwuxinxi`, searchForm);
                } else {
                    res = await this.$api.list(`fuwuxinxi`, searchForm);
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
	.screenBox {
		padding: 20rpx 0 20rpx 0;
		transform: translate3d(100%, 0, 0);
		z-index: 666;
		top: 0;
		background: #fff;
		width: 80%;
		position: absolute;
		right: 0;
		transition: transform .3s;
		height: 100%;
		.screenTab {
			border: 2rpx solid #91DBE8;
			border-radius: 40rpx;
			margin: 10rpx 0 10rpx 0;
			background: none;
			width: calc(100% / 3 - 24rpx);
			line-height: 72rpx;
			text-align: center;
		}
		.screenTabActive {
			border-radius: 40rpx;
			margin: 10rpx 0 10rpx 0;
			color: #fff;
			background: linear-gradient( 90deg, #F5C3E5 0%, #91DBE8 100%);
			width: calc(100% / 3 - 20rpx);
			line-height: 72rpx;
			text-align: center;
		}
	}
	.screenBoxActive {
		transform: translate3d(0, 0, 0);
	}
</style>
