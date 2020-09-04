<template>
  <view class="score-internal">
    <view
      class="[score-star,num===4?'score-star-last':'', ui-star, num<score?num+1>score?'ui-star-half':'':'ui-star-grey']"
      v-for="num in [0,1,2,3,4]"
      :key="num"
    ></view>
  </view>
</template>
<script>
export default {
    props:{
        score:{
            type:Number,
            default:0
        }
    },
    data(){
        return {

        }
    }
};
</script>
<style lang="scss">
    .score-star {
        margin-right: 6rpx;
        display: inline-block;
    }

    .score-star-last {
        margin-right: 0;
    }
</style>