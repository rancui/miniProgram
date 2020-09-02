
<template>
<view class="index-search">
    <view @click="searchClick" class="index-search-container flex-left">
    <view class="index-search-bg flex-left" :class="{ setHeight:searchHeight }">
        <image class="index-search-icon" src="@/static/images/icons/search.png"></image>
        <view class="index-search-placeholder ellipsis">{{recommended_search_keyword.view_keyword||"请输入商家或商品名称"}}</view>
    </view>
    </view>
</view>
</template>
<script>
export default {
    comments:{},
    data(){
      return {
        recommended_search_keyword:{
        search_keyword:'',
        view_keyword:""
        },
       searchHeight:true,
      }
    },
    methods:{
		searchClick(){
			wx.navigateTo({
				url: "/pages/search/search"
			});
		}
    }
   
}
</script>
<style lang="scss" scoped>
.index-search-icon {
    width: 26rpx;
    height: 26rpx;
    flex: 0 0 auto;
}

.index-search-container {
    position: relative;
    margin-left: 20rpx;
    flex: 1 1;
}

.index-search-placeholder {
    margin-left: 7rpx;
    font-size: 28rpx;
    color: #666;
}

.index-search-bg {
    background: #EFEFEF;
    border-radius: 100rpx;
    padding: 0 20rpx;
    margin-right: 20rpx;
    flex: 1 1 0;
    width: 300rpx;
}
.setHeight{
    height: 60rpx;
}
</style>