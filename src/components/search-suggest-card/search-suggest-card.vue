<template>
	<view class="search-suggest-card">
	<view @click="onClickHot" class="search-suggest-card" v-for="(item,index) in hotLabelList" :key="index" :class="[item.label_type===12004?'search-suggest-card-hot':'']">
		<image class="icon-label-shop " src="@/static/images/icons/shop.png" v-if="item.label_type===12000||item.label_type===12003"></image>
		{{item.label_name}}
	</view>
	</view>
</template>


<script>
	export default {
		props: {
			hotLabels: {
				type: Array,
				default: []
			},
			isHistory:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				isHistory: false,
				hotLabelList: [],
				yesHistory:true
			}
		},
		watch:{
			hotLabels:function(val){
				this.hotLabelList = val;
			},
			isHistory:function(val){
				this.yesHistory = val;
			},
			onClickHot: function(e) {
				var t = e.currentTarget.dataset, a = t.item, i = t.history, r = a.label_type, s = a.wm_poi_id, n = a.search_keyword;
				switch (r) {
				  case j.poi:
				  case j.poiKA:
					this.naviatePoi(s);
					break;
				  case j.food:
				  case j.hotword:
				  case j.search:
				  case j.h5:
				  default:
					this.setData({
						keywordValue: n,
						inputShowClear: !0
					}), this.searchManager.search(n), this.setLabelType(r), this.search();
				}
				var o = this.data.historyLabels, c = I.add(a);
				c !== o && this.setData({
					historyLabels: c
				}), i ? this.lxHisClick(a) : this.lxHotClick(a);
			},
		}
	}
</script>

<style lang="scss">
</style>
