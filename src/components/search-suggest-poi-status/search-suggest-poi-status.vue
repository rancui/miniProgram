<template>
	<view class="search-poi-status-content">
		<view class="search-poi-status" :class="[wm_poi_business_status.poi_addition_info.delivery_type?'deliverying':'']">
			<block v-if="wm_poi_business_status.poi_addition_info.delivery_type"> {{wm_poi_business_status.poi_addition_info.min_price_tip}}
				<text class="deliverying-sep-line">|</text> {{wm_poi_business_status.poi_addition_info.shipping_fee_tip}} <text class="deliverying-sep-line">|</text>
				{{wm_poi_business_status.poi_addition_info.distance}} 
			</block>
			<block v-else>
				<text class="search-poi-status-title">{{wm_poi_business_status.poi_addition_info.shipping_time_info.status_content}}</text>
				<text class="search-poi-status-description">{{wm_poi_business_status.poi_addition_info.shipping_time_info.desc_content}}</text>
			</block>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			wm_poi_business_status:{
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
	.search-poi-status-content {
		margin-top: 5rpx;
	}

	.search-poi-status {
		position: relative;
		display: inline-block;
		font-size: 20rpx;
	}

	.search-poi-status-title {
		position: relative;
		display: inline-block;
		color: #fff;
		padding: 2rpx 8rpx;
	}

	.search-poi-status-description {
		display: inline-block;
		height: 100%;
		padding: 0 7rpx;
	}

	.deliverying {
		font-size: 22rpx;
		color: #666;
	}

	.deliverying-sep-line {
		color: #e4e4e4;
		margin: 0 10rpx;
		display: inline-block;
		height: 18rpx;
		overflow: hidden;
		margin-bottom: 2rpx;
	}

	.search-poi-status.booking {
		color: #37A2EE;
	}

	.search-poi-status.booking:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		border: 1rpx solid #37A2EE;
		width: 200%;
		height: 200%;
		transform-origin: 0 0;
		transform: scale(0.5, 0.5);
		box-sizing: border-box;
	}

	.booking .search-poi-status-title {
		background-color: #37A2EE;
	}

	.search-poi-status.only {
		color: #FFA735;
	}

	.search-poi-status.only:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		border: 1rpx solid #FFA735;
		width: 200%;
		height: 200%;
		transform-origin: 0 0;
		transform: scale(0.5, 0.5);
		box-sizing: border-box;
	}

	.only .search-poi-status-title {
		background-color: #FFA735;
	}

	.search-poi-status.breaking {
		color: #666;
	}

	.search-poi-status.breaking:after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		border: 1rpx solid #666;
		width: 200%;
		height: 200%;
		transform-origin: 0 0;
		transform: scale(0.5, 0.5);
		box-sizing: border-box;
	}
</style>
