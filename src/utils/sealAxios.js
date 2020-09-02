import axios from "axios-miniprogram";
// import EventBus from '@/assets/js/eventBus';
// 基础路径
// VUE_APP_BASE_URL = 'http://211.95.59.228:8000'
const baseUrl = 'https://preloanreport.vcredit.com/preLoanReportAPI'; //process.env.VUE_APP_BASE_URL;
// axios默认设置
axios.defaults.baseURL = baseUrl;
// 正在进行中的请求列表
let pendingList = []; 
/**
 * 阻止重复请求
 * @param {array} pendingList - 请求缓存列表
 * @param {string} url - 当前请求地址
 * @param {string} errorMessage - 提示信息
 */
const stopRepeatRequest = function (pendingList, url, errorMessage) {
  const errorMsg = errorMessage || '';
  for (let i = 0; i < pendingList.length; i++) {
    if (pendingList[i].url === url) {
      pendingList[i].cancel(errorMsg);
      pendingList.splice(i, 1);
    }
  }
}

/**
 * 允许某个请求可以继续进行
 * @param {array} pendingList 全部请求列表
 * @param {string} url 请求地址
 */
const allowRequest = function (pendingList, url) {
  for (let i = 0; i < pendingList.length; i++) {
    if (pendingList[i] === url) {
      pendingList.splice(i, 1);
      break;
    }
  }
}
// 路由跳转时，在全局导航守卫beforeEach中触发EventBus.$emit('clearRequesting')
// EventBus.$on('clearRequesting', () => {
//   pendingList = [];
// });

// 取消请求
const { CancelToken } = axios;
// 请求拦截器
axios.interceptors.request.use(
  config => {
    wx.showLoading();
    // 发送请求前，阻止重复请求
    stopRepeatRequest(pendingList, config.url, `${config.url} 请求被中断`);
  	// 设置cancelToken对象
    config.cancelToken = new CancelToken(function(c) {
      pendingList.push({
        url: config.url,
        cancel: c
      }); 
    });
    return config;
  },
  error => {
    console.error(error.config);
    return Promise.reject(error);
  },
);

// 响应拦截器
axios.interceptors.response.use(
  response => {
    //请求成功后，删除该请求
    stopRepeatRequest(pendingList, response.config.url, `请求成功，${response.config.url} 被清除出请求列表`);
    wx.hideLoading();
    const res = response.data;
    return res;
  },
  error => {
    // 判断该异常是否是由取消请求所导致
    if (axios.isCancel(error)) {
      console.error(error.message);
    } 
    return Promise.reject(error);
  },
);

export default axios;
