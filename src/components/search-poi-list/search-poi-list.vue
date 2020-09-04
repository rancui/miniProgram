<template>
<view class="search-poi-list">
    <view class="search-poi-item" v-for="(item,index) in poilist" :key="item.id">
        <navigator @click="onClickPoilistItem" :class="[poi-nav,index===poilist.length-1?'poi-nav-last':'']"   :url="'../restaurant/restaurant?poi_id='+item.id">
            <view class="[poi-item,item.product_list.length===1?'poi-item-products-1':item.product_list.length>1?'poi-item-more':'']">
                <view class="poi-img"  :style="{backgroundImage:item.pic_url?`url(${item.pic_url})`:'@/static/images/icons/no-shopImg.png)'}">
                    <view class="poi-icon" :style="{backgroundImage:`url(${item.poi_type_icon})`}" v-if="item.poi_type_icon"></view>
                </view>
                <view class="poi-info">
                    <view class="poi-row poi-row-head">
                        <view class="poi-name">
                            <text :class="[item.highLight===true?'poi-name-highlight':'']">{{item.name}}</text>
                        </view>
                        <view class="poi-distance"> {{item.distance}} </view>
                    </view>
                    <view class="poi-row poi-row-sales">
                        <block v-if="item.shipping_time_info.in_shipping_time===0">
                            <view class="[poi-status-tag, item.shipping_time_info.reservation_status===1?'poi-status-tag-special':'poi-status-tag-preorder']"> {{item.shipping_time_info.status_content}} </view>
                            <view class="[poi-status-text, item.shipping_time_info.reservation_status===1?'poi-status-text-special':'poi-status-text-preorder']"> {{item.shipping_time_info.desc_content}} </view>
                        </block>
                        <block v-else>
                            <score :score="item.wm_poi_score" v-if="item.status===1"></score>
                            <view class="poi-status-tag poi-status-tag-closed" v-else> {{item.status_desc}} </view>
                        </block>
                        <view class="poi-estimate"> {{item.delivery_time_tip}} </view>
                    </view>
                    <view class="poi-row poi-row-ship">
                        <view class="poi-price"> {{item.min_price_tip}} </view>
                        <view class="poi-line"></view>
                        <view class="poi-ship"> {{item.shipping_fee_tip}} </view>
                        <image class="poi-deliver" src="@/static/images/icons/deliver.png" v-if="item.delivery_type===1"></image>
                    </view>
                    <view @click.stop="item.discounts2.length<3?'':'onClickPoilistActvs'"  :class="[poi-actvs,poilistActvsShown[item.id]?'poi-actvs-expanded':'']"  v-if="item.discounts2.length">
                        <view class="[poi-arrow,poilistActvsShown[item.id]?'ui-arrow ui-arrow-up':'ui-arrow ui-arrow-down']" v-if="item.discounts2.length>2"></view>
                        <view class="poi-actvs-item" :hidden="idx>1&&!poilistActvsShown[item.id]" v-for="(actv,idx) in item.discounts2"  :key="actv.type">
                            <image class="poi-actvs-icon" :src="actv.icon_url" v-if="actv.icon_url"></image>
                            <view class="poi-actvs-text">{{actv.info}}</view>
                        </view>
                    </view>
                    <view class="poi-products-wrap" v-if="item.product_list.length>0">
                        <view @click.stop="onClickPoiProduct" class="poi-products"   :hidden="productIndex>0&&!productShown[item.id]" v-for="(productitem,productIndex) in item.product_list" :key="productitem.product_spu_id">
                            <view class="poi-prodcut-price">￥{{productitem.original_price}}</view>
                            <view class="poi-product-left">
                                <text class="poi-product-name">
                                    <text :class="[productNameitem.highLight===true?'poi-name-highlight':'']" v-for="(productNameitem,index) in productitem.product_name"  :key="index">{{productNameitem.name}}</text>
                                </text>
                            </view>
                        </view>
                    </view>
                </view>
            </view>
            <view @click.stop="onClickMoreProduct" class="poi-products-more flex-center"  v-if="item.product_list.length>1"> {{productShown[item.id]?'收起':'展开其他'+item.product_list.length-1+'个商品'}} <view :class="[ui-arrow,productShown[item.id]?'ui-arrow-up':'ui-arrow-down']"></view>
            </view>
        </navigator>
    </view>
</view>

       
</template>
<script>
import score from '@/components/score/score.vue'
export default {
    components:{
       score
    },
    props:{
       poilist:{
           type:Array,
           default:[]
       },
       productShown:{
           type:Object,
           default:{} 
       },
       poilistActvsShown:{
           type:Object,
           default:{}    
       }
    },
    data(){
        return {

        }
    }
    
}
</script>
<style lang="scss">

</style>