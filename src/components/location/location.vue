<template>
  <view @click="onLocTap" class="header-loc-nav flex-left">
    <view class="header-loc flex-left">
      <image class="header-loc-icon"></image>
      <view class="header-loc-text ellipsis">{{locState==='loading'?'上海市虹口区...':locState==='fail'?'无法获取地址':locName}}</view>
      <view class="header-loc-arrow ui-arrow ui-arrow-right"></view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      locState: "loading",
      locName: "",
      hideLoc: "",
      forceDock: "",
    };
  },
  methods:{
	  onLocTap(){

	  }
  }
};
</script>
<style lang="scss">
.header-loc-nav {
  flex: 0 0 auto;
  max-width: 750px;
  transition: 300ms max-width;
  overflow: hidden;
}

.header-loc-nav.hide {
  max-width: 0;
}

.header-loc {
  margin-left: 20rpx;
  border-radius: 83rpx;
  max-width: 300rpx;
  height: 58rpx;
  font-size: 28rpx;
  color: #000;
  padding-left: 16rpx;
  box-sizing: border-box;
}

.header-loc-icon {
  width: 20rpx;
  height: 27rpx;
  margin-right: 10rpx;
  flex: 0 0 auto;
  background: url(../../static/images/icons/loc.png) no-repeat;
  background-size: 100% auto;
}

.header-loc-text {
  font-size: 32rpx;
  flex: 1 1 auto;
}

.header-loc-arrow {
  margin-left: 10rpx;
  width: 10rpx;
  height: 19rpx;
  background-image: url("data:image/png;charset=utf-8;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAASCAYAAABit09LAAAAAXNSR0IArs4c6QAAAOVJREFUKBWN0T0KwjAUB3CTQAc/TiBOOrm2S0UxU/EQXs8r2NE4FQo9gCAIgmNxaBfrEP8pNTSGpj5Ik/B+JO+lTEpJEFQIIQeOIEEQnIBnnuftkiS5dlkK9ERyXlWVCMNw0QmR2OPqM+apCxN1gu/7Q+AjTt9i+0AZ/LeMGv6DNezDBnRhCyocRdEoz/MYyw3GC2NC8bEC3RM0xppE/SMsyDkfF0UR4xVWgHfG2DLLsrdx9RcBrBvE0zS9qZM1dCEN+1AN/0EK0rIsD5itmlSyHapr9Z8v6E4X3gbGGm+mmzISrc0HtseJy54SecUAAAAASUVORK5CYII=");
  flex: 0 0 auto;
}
</style>