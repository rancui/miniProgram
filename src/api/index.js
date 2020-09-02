import request from '../utils/sealAxios.js';
var baseUrl = 'https://www.easy-mock.com/mock/5f4e1140b52a25318ce1f336/weapp/v1';
var baseMockUrl = 'http://localhost:7300/mock/5f4f2ec306091200203ffdc6/mt';
export function getfilterconditions() {
	return request.post(`${baseUrl}/poi/getfilterconditions`)
}
// 首页icon分类
export function getCategoryIConList(){
	return request.get(`${baseMockUrl}/getCategoryIConList`)
}

export function hotlabelAndHistory(){
	return request.post(`${baseMockUrl}/search/home/hotlabelandhistory`)
}