<template>
	<view class="category_icon_list">
		<swiper  class="primary-filter primary-filter-swiper" :current="cur" @change="swiperChange" >
			<block v-for="(categoryIcons,index) in categoryIconList" :key="index">
			<swiper-item class="primary-filter-page">
				<view  class="primary-filter-item" v-for="(item,index) in categoryIcons.categoryIconItems" @click="onClickTypeIcon(item)" :key="index">
					<image class="primary-filter-icon" :src="item.iconUrl" ></image> {{item.name}}
				</view>
			</swiper-item>
			</block>
		</swiper>
		<!--重置小圆点的样式  -->
		<view class="dots">
			<block v-for="(categoryIcons,index) in categoryIconList"  :key="index">
				<view class="dot " :class="[index === cur ? 'active' : '']"></view>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		name:"",
		props:{
			categoryIconitems:{
				type:Array,
				default:[]
			}
		},
		data(){
			return {
				currentSwiper: 0,
				autoplay: false,
				indicatorDots:true,
				categoryIconList:[],
				cur:0
			}
		},
		watch:{
			categoryIconitems:function(val){
				this.categoryIconList = val;
			}
		},
		methods:{
			  //滑动事件监听
			  swiperChange:function(e){
				this.cur = e.detail.current;
				console.log(this.cur);
			  },
			  onClickTypeIcon(item){
				 wx.navigateTo({
				 	url: "/pages/search/search?typeCode=" + item.code + "&typeName=" + item.name
				 });
				 
			  }
		// 	  onClickTypeIcon: function(e) {
		// 		  var t = e.currentTarget.dataset, a = t.code, n = t.index, r = t.name;
		// 		  if (a === T) {
		// 			  if (wx.canIUse && wx.canIUse("navigateToMiniProgram")) {
		// 				  var i = this.store.getState(), o = i.recipient, s = o.longitude, c = o.latitude, l = i.wx, u = l.longitude, d = l.latitude, p = i.user, f = p.token, g = p.user_id, _ = i.dev.env;
		// 				  wx.navigateToMiniProgram({
		// 					  appId: S,
		// 					  path: "/pages/index/index?channel=wx_wmjg_miniPrograms&lng=" + (s || u) + "&lat=" + (c || d) + "&cityname=" + H + "&mtuserid=" + g + "&token=" + f,
		// 					  envVersion: "qa" === _ ? "trial" : "release"
		// 				  });
		// 			  }
		// 		  } else wx.navigateTo({
		// 			  url: "/pages/channel-page/channel-page?typeCode=" + a + "&typeName=" + r
		// 		  });
		// 		  this.traceTagStart({
		// 			  src_page: h,
		// 			  src_block: x,
		// 			  src_item_index: n,
		// 			  src_item_id: a,
		// 			  tgt_page: v,
		// 			  action: P
		// 		  }), this.lxKingkongClick({
		// 			  cat_id: a,
		// 			  index: n
		// 		  });
		// 	},
		
		}
	}
</script>

<style lang="scss">
	.primary-filter {
	    font-size: 24rpx;
	    color: #333;
	    position: relative;
	    background: #fff;
	    padding-bottom: 30rpx;
	}
	
	.primary-filter-placeholder {
	    padding-bottom: 48rpx;
	}
	
	.primary-filter-swiper {
	    height: 380rpx;
	    padding-bottom: 0;
	}
	
	.primary-filter-item {
	    padding-top: 30rpx;
	    width: 20%;
	    display: inline-block;
	    text-align: center;
	    line-height: 32rpx;
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	}
	
	.primary-filter-item-second-row {
	    padding-bottom: 30rpx;
	}
	
	.primary-filter-icon {
	    display: block;
	    margin: auto;
	    width: 88rpx;
	    height: 88rpx;
	    margin-bottom: 10rpx;
	}
	
	.primary-filter-icon-occupied {
	    border-radius: 50%;
	    width: 88rpx;
	    height: 88rpx;
	    background-color: #F4F4F4;
	}
	
	.primary-filter-name {
	    margin: auto;
	    width: 88rpx;
	    height: 30rpx;
	    background-color: #F4F4F4;
	}
	.category_icon_list{
		position: relative;
	}
	.dots {
	  width:50rpx; 
	  height: 10rpx;
	  display: flex;
	  flex-direction: row;
	  position: absolute;
	  bottom: 16rpx;
	  left: 50%;
	  transform: translate3d(-50%,0,0);
	}
	/*未选中时的小圆点样式 */
	.dot {
	  width: $dotWidth;
	  height: $dotHeight;
	  border-radius: 50%;
	  margin-right: 8rpx;
	  background-color: $dotColor;
	}
	/*选中以后的小圆点样式  */
	.active {
	  width: 20rpx;
	  border-radius: 4rpx;
	  background-color: $dotActiveColor;
	}
</style>
