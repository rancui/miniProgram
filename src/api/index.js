import request from '../utils/sealAxios.js';
var baseUrl = 'https://www.easy-mock.com/mock/5f4e1140b52a25318ce1f336/weapp/v1';
// var baseMockUrl = 'http://localhost:7300/mock/5f4f2ec306091200203ffdc6/mt';// c
var baseMockUrl = 'http://localhost:7300/mock/5f510bca1cc87b001d3158be/mt'; // home
export function getfilterconditions() {
	return request.post(`${baseUrl}/poi/getfilterconditions`)
}
// 首页icon分类
export function getCategoryIConList() {
	return request.post(`${baseMockUrl}/search/home/getCategoryIConList`)
}

export function hotlabelAndHistory() {
	return request.post(`${baseMockUrl}/weapp/v1/search/home/hotlabelandhistory`)
}
export function suggest() {
	return request.post(`${baseMockUrl}/weapp/v1/search/v8/suggest`)
}

export function food(name) {
	return request.post(`${baseMockUrl}/weapp/v1/poi/food`, {
		'name': name
	})
}