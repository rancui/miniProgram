<template>
	<div class="page-container">
		<div class="index-container">
			<div class="header-index-holder">
				<div class="header-index">
					<Location></Location>
					<Search></Search>
				</div>
			</div>
			<CategoryFilterList :categoryIconitems="categoryIcons" v-on:clickTypeIcon="clickTypeIcon"></CategoryFilterList>
		</div>
	</div>
</template>

<script>
    import {getfilterconditions,getCategoryIConList} from '@/api/index.js';
	import Location from '@/components/location/location.vue';
	import Search from '@/components/index-search/index-search.vue';
	import CategoryFilterList from '@/components/categoryFilterList/categoryFilterList'
	export default {
		name: "首页",
		components: {
			Location,
			Search,
			CategoryFilterList
		},
		data() {
			return {
				categories:[],
				categoryIcons:[],
				hasMore: false,
				locState: "loading",
				locationEnabled: true,
				locationRetrying: false,
			}
		},
		onLoad() {
			var that = this;
			getfilterconditions().then(function(res){
				console.log('=======',res);
				that.categories = res.data.category_filter_list;
				console.log('====categories====',that.categories);
			}).catch(e=>{
				console.log(e);
			});
			// 首页分类
			getCategoryIConList().then(function(res){
				console.log('===getCategoryIConList===',res);
				that.categoryIcons = res.data.categoryIconList;
			}).catch(e=>{
				console.log(e);
			});
		},
		methods: {
			clickTypeIcon(item){
				console.log(item);
			}
		}
	}
</script>

<style lang="scss">
	.header-index-holder {
		position: sticky;
		top: 0rpx;
		z-index: 1;
	}

	.header-index {
		display: flex;
		flex-flow: row nowrap;
		padding: 15rpx 0;
		background: #fff;
	}
</style>
