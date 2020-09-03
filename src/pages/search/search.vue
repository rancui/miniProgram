<template>
	<view class="page-container">
		<view class="search-container">
			<view class="index-search-bg">
				<image class="search-icon" src="@/static/images/icons/search.png"></image>
				<input v-model="searchValue" type="text" placeholder="占位符" placeholder-class="shop-search-placeholder" @confirm="onClickSearch"
				 @input="onSearchInput" focus="true" class="index-search-input"/>
				<view @click="onDeleteKey" class="search-delete-wrap" v-if="inputShowClear">
					<image class="search-delete-icon" src="@/static/images/icons/clear.png"></image>
				</view>
			</view>
			<button @click="onClickSearch" class="ui-btn ui-btn-no-border btn-search " :class="[!inputShowClear&&!keywordLabel?'search-btn-disabled':'']">搜索</button>
		</view>

		<view v-if="pageState==='hot'">
			<view class="search-hot-container" v-if="hotLabels.length">
				<view class="search-title">热门搜索</view>
				<view class="search-suggest-container search-suggestHot-container">
					<search-suggest-card :hotLabels="hotLabels"></search-suggest-card>
				</view>
			</view>
			<view class="search-hot-container" v-if="historyLabels.length">
				<view class="search-title"> 历史搜索 <image @click="onClickDelete" class="delete-search" src="@/static/images/icons/delete-search.png"></image>
				</view>
				<view class="search-suggest-container">
					<search-suggest-card :hotLabels="historyLabels" :isHistory="isHistory"></search-suggest-card>
				</view>
			</view>
		</view>

	     <!-- <scroll-view class="search-list-container" scrollY="true" v-if="pageState==='suggest'"> -->
		<scroll-view class="search-list-container" scrollY="true" v-if="pageState==='suggest'">
	        <view class="search-suggest-wrap">
	            <block v-for="(item,idx) in suggest" :key="idx">
	                <view  v-if="item.type===0" @click="onClickSuggestShop(item.content)" class="search-poi">
	                    <view class="search-poi-content">
	                        <image class="search-poi-pic" mode="aspectFill" src="@/static/images/icons/shop.png"></image>
	                        <view class="search-poi-info">
	                            <view class="search-poi-name" :style="{width:item.wm_poi_name_width_percent_style}">
	                            <text>{{item.content}}</text>
								</view>
	                            <image class="search-poi-mt-deliver" src="@/static/images/icons/deliver.png" v-if="item.poi_addition_info.delivery_type"></image>
								<text v-if="item.poi_addition_info.label_info.length>0">
	                              <text class="search-poi-discount"  v-for="(labelInfo,index) in  item.poi_addition_info.label_info" :key="index">{{labelInfo.content}}</text>
								</text>
								<search-suggest-poi-status :wm_poi_business_status="item"></search-suggest-poi-status>
	                        
							</view>
	                    </view>
	                </view>
	                <view v-else @click="onClickSuggestWord"  class="search-poi">
	                    <image class="search-query-pic" src="@/static/images/icons/magnify-glass.png"></image>
	                    <view class="search-poi-query-content">
	                        <view class="search-poi-info search-poi-query" :style="{width:item.wm_poi_query_width_percent_style}">
							 <text>{{item.content}}</text>
							</view>
	                    </view>
	                    <view class="search-query-count">{{item.query_addition_info.resultNum}}</view>
	                </view>
	            </block>
	        </view>
	    </scroll-view>
	 
	</view>

</template>

<script>
	import SearchSuggestCard from '@/components/search-suggest-card/search-suggest-card.vue';
	import SearchSuggestPoiStatus from '@/components/search-suggest-poi-status/search-suggest-poi-status.vue';
	import {
		hotlabelAndHistory,
		suggest,food
	} from '@/api/index.js'
	export default {
		components: {
			SearchSuggestCard,
			SearchSuggestPoiStatus
		},
		data() {
			return {
				inputFocus: true,
				inputShowClear: false,
				keywordLabel: "",
				keyword:"",
				searchValue: "",
				hotLabels: [],
				historyLabels: [],
				isHistory: true,
				pageState: "hot",
				suggest: [],
				terms: [],
				search_poi_list: [],
				inputDelay:100,			
				to:null

			}
		},
		created() {
				this.getHotlabelAndHistory();
		},
		methods: {
			getHotlabelAndHistory() {
				var that = this;
				hotlabelAndHistory().then(function(res) {
					var result = res.data;
					that.hotLabels = result.labels;
					console.log(that.hotLabels);
				})
			},
			onSearchInput(e){
			   var value = e.detail.value;
			   this.onInput(value);
			},
			onInput(arg){
			   arg = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0]: "";
			   this.keyword = arg.replace(/\s/g, "");
			   void 0 !== this.keyword ? this.pageState = "suggest":this.pageState = "hot";
			   if (clearTimeout(this.to), !(arg = (arg || "").replace(/\s/g, "")) || arg !== this.keyword) {
					return this.keyword = arg;
			   }
			   var that = this;
			   this.to = setTimeout(function() {
                  that.onSuggest();
			   }, that.inputDelay);
			},
			getKeyword(){
               return this.keyword;
			},
			onSuggest() {
				
				this.inputShowClear = Boolean(this.getKeyword());
				console.log(this.inputShowClear);
				this.loadSuggest();
			},
			loadSuggest(){
			   var that = this;
               suggest().then(function(res){
				   let result = res.data;
				   that.suggest = result.suggest;
			   });
			},
			onClickSuggestShop(val){
			   food(val).then(function(res){
					let result = res.data;
			   });
			}
		}
	}
</script>

<style lang="scss">
	@import '@/assets/scss/search-bar.scss';
	@import '@/assets/scss/poi-list.scss';
	@import '@/assets/scss/poi-status.scss';

	page {
		height: 100%;
		font-size: 22rpx;
		color: #666;
	}

	.page-container {
		padding-top: 88rpx;
	}

	.search-hot-container {
		background: #fff;
		margin-bottom: 20rpx;
	}

	.search-title {
		font-size: 28rpx;
		color: #666;
		height: 70rpx;
		line-height: 70rpx;
		width: 100%;
		margin-left: 30rpx;
		display: block;
		position: relative;
	}

	.search-title::after {
		content: '';
		width: 200%;
		height: 0;
		position: absolute;
		bottom: 0;
		left: 0;
		border-bottom: 1px solid #e4e4e4;
		transform-origin: 0 0;
		transform: scale(0.5);
	}

	.search-suggest-container {
		padding: 0 30rpx 26rpx 30rpx;
		overflow: hidden;
	}

	.search-suggestHot-container {
		padding-bottom: 14rpx;
		height: 164rpx;
	}

	.search-suggest-card {
		margin: 26rpx 24rpx 0 0;
		float: left;
		height: 54rpx;
		line-height: 54rpx;
		padding: 0 20rpx;
		font-size: 24rpx;
		color: #2f2f2f;
		text-overflow: ellipsis;
		white-space: nowrap;
		max-width: 90%;
		position: relative;
	}

	.search-suggest-card::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 200%;
		height: 200%;
		border: 1px solid #ccc;
		border-radius: 4rpx;
		transform-origin: 0 0;
		transform: scale(0.5);
	}

	.search-suggest-card-hot {
		color: #FB4E44;
		border: 1rpx solid #FB4E44;
	}

	.delete-search {
		position: absolute;
		width: 32rpx;
		height: 32rpx;
		right: 60rpx;
		top: 20rpx;
	}

	button.btn-search {
		padding: 0;
		width: 125rpx;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 28rpx;
		position: absolute;
		right: 0;
		text-align: center;
		overflow: hidden;
		border-radius: 4rpx;
		background: #fff !important;
		color: #ffb000;
	}

	.search-btn-disabled {
		color: #999 !important;
	}

	.search-poi-content {
		position: relative;
		position: relative;
		padding: 20rpx 20rpx 20rpx 0;
	}

	.search-poi-content:after {
		content: ' ';
		display: inline-block;
		width: 100%;
		height: 1px;
		background-color: #e4e4e4;
		position: absolute;
		left: 0;
		bottom: 0;
		transform-origin: 0 0;
		transform: scaleY(0.5);
	}

	.search-poi-pic {
		position: absolute;
		left: 0;
		top: 21%;
		width: 34rpx;
		height: 34rpx;
	}

	.search-query-pic {
		position: absolute;
		left: 30rpx;
		top: 30%;
		width: 34rpx;
		height: 34rpx;
	}

	.search-poi {
		position: relative;
		padding-left: 30rpx;
		background: #fff;
	}

	.search-poi:last-child .search-poi-content:after,
	.search-poi:last-child .search-poi-query-content:after {
		background-color: #fff;
	}

	

	.breaking .search-poi-status-title {
		display: none;
	}

	.search-poi-info {
		margin-left: 44rpx;
		font-size: 28rpx;
		color: #333;
	}

	.search-poi-name {
		display: inline-block;
		max-width: 66%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		vertical-align: middle;
	}

	.search-poi-time {
		font-size: 24rpx;
		color: #999;
		float: right;
		line-height: 33rpx;
		margin-top: 40rpx;
	}

	.search-poi-highlight {
		color: #999;
	}

	.search-poi-mt-deliver {
		width: 100rpx;
		height: 28rpx;
		vertical-align: middle;
		margin-left: 10rpx;
	}

	.search-poi-discount {
		position: relative;
		font-size: 20rpx;
		color: #FB4E44;
		line-height: 24rpx;
		margin-left: 10rpx;
		padding: 0 8rpx;
	}

	.search-poi-discount:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		border: 1rpx solid #FDC9C6;
		width: 200%;
		height: 200%;
		transform-origin: 0 0;
		transform: scale(0.5, 0.5);
		box-sizing: border-box;
	}

	.search-poi-query-content {
		position: relative;
	}

	.search-poi-query-content:after {
		content: ' ';
		display: inline-block;
		width: 100%;
		height: 1px;
		background-color: #e4e4e4;
		position: absolute;
		left: 0;
		bottom: 0;
		transform-origin: 0 0;
		transform: scaleY(0.5);
	}

	.search-poi-query {
		padding: 25rpx 0;
		margin-left: 0;
		padding-left: 44rpx;
		max-width: 70%;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.search-query-count {
		position: absolute;
		right: 20rpx;
		top: 30%;
		font-size: 22rpx;
		color: #999;
	}

	.header-select {
		height: 80rpx;
		border-bottom: 1rpx solid #c4c4c4;
		font-size: 28rpx;
		background: #fff;
		position: fixed;
		top: 80rpx;
		left: 0;
		width: 100%;
		z-index: 20;
	}

	.all-type,
	.complex-sort,
	.select {
		flex: 1;
		height: 32rpx;
	}

	.br {
		border-right: 1rpx solid #e4e4e4;
	}

	.funnel-icon {
		width: 23rpx;
		height: 22rpx;
	}

	.select-icon {
		margin-left: 8rpx;
	}

	.arrow-icon {
		width: 14rpx;
		height: 7rpx;
	}

	.poi-container,
	.wrap {
		height: 100%;
	}

	.poi-list {
		background: #fff;
		padding-left: 20rpx;
		margin-top: 100rpx;
	}

	.search-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99;
	}

	.poi-wrap {
		position: relative;
		background: #f2f2f2;
		padding-bottom: 128rpx;
	}

	.poi-name-highlight {
		color: #FFB000;
	}

	.poi-products {
		padding: 24rpx 0 20rpx;
		overflow: hidden;
		position: relative;
	}

	.poi-products::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 0;
		width: 200%;
		border-top: 1px solid #e4e4e4;
		transform-origin: 0 0;
		transform: scale(0.5);
	}

	.poi-product-left {
		margin-right: 110rpx;
	}

	.poi-product-name {
		font-size: 28rpx;
		color: #333;
		line-height: 32rpx;
		display: block;
		margin-bottom: 10rpx;
	}

	.poi-product-num {
		font-size: 22rpx;
		line-height: 30rpx;
		color: #666;
		display: block;
	}

	.poi-prodcut-price {
		float: right;
		color: #FFB000;
		width: 110rpx;
		font-size: 28rpx;
		text-align: right;
	}

	.poi-products-wrap {
		margin-top: 20rpx;
	}

	.poi-item {
		border-bottom: none;
		padding-left: 20rpx;
		background: #fff;
	}

	.poi-item-products-1 {
		padding-bottom: 10rpx;
	}

	.poi-item-more {
		padding-bottom: 0;
	}

	.poi-products-more {
		color: #333;
		font-size: 28rpx;
		line-height: 32rpx;
		text-align: center;
		padding: 20rpx 0;
		background: #fff;
		position: relative;
	}

	.poi-products-more::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		height: 0;
		width: 200%;
		border-top: 1px solid #e4e4e4;
		transform-origin: 0 0;
		transform: scale(0.5);
	}

	.poi-products-more .ui-arrow {
		margin-left: 20rpx;
		width: 16rpx;
		height: 8rpx;
	}

	.poi-nav {
		margin-bottom: 20rpx;
	}

	.poi-nav-last {
		margin-bottom: 0;
	}

	.poi-non-highlight {
		color: #F9B700;
	}

	.non-delivery-wrap {
		color: #656565;
		line-height: 60rpx;
		font-size: 28rpx;
		padding: 15rpx 0;
		background: #fff;
		position: relative;
	}

	.non-delivery-wrap image {
		float: left;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		margin-right: 20rpx;
		margin-left: 30rpx;
	}

	.non-delivery-text {
		width: 600rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.non-delivery-arrow {
		position: absolute;
		width: 12rpx;
		height: 22rpx;
		top: 50%;
		right: 28rpx;
		transform: translateY(-50%);
	}

	.poi-guess-heart {
		width: 34rpx;
		height: 34rpx;
		margin-right: 10rpx;
		position: relative;
		top: 6rpx;
	}

	.poi-guess-tab {
		padding: 15rpx 0;
		text-align: center;
	}

	.poi-guess-title {
		line-height: 40rpx;
		color: #656565;
		font-size: 28rpx;
		margin: 0 auto;
		width: 200rpx;
		position: relative;
	}

	.poi-guess-leftline {
		display: block;
		content: '';
		height: 1rpx;
		width: 150rpx;
		background: #e4e4e4;
		position: absolute;
		left: -160rpx;
		top: 20rpx;
	}

	.poi-guess-rightline {
		display: block;
		content: '';
		height: 1rpx;
		width: 150rpx;
		background: #e4e4e4;
		position: absolute;
		right: -160rpx;
		top: 20rpx;
	}

	.icon-label-shop {
		width: 32rpx;
		height: 32rpx;
		margin: 11rpx 5rpx 0 0;
		float: left;
	}

	.search-list-container {
		position: fixed;
		left: 0;
		top: 88rpx;
		height: 93%;
	}

	.loading-data {
		position: absolute;
		left: 0;
		bottom: 14rpx;
		width: 100%;
	}
</style>
