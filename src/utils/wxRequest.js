let baseUrl = "";

const request = (params)=>{
	uni.showLoading({
		title:'加载中',
		mask:false
	});
	return new Promise((resolve,reject)=>{
		uni.request({
			url: baseUrl+params.url,
			method:params.url,
			data:params.data,
			header:{
				'Content-type':'application/x-www-form-urlencoded'
			},
			success(res){
				if(res.statusCode === 200){
					resolve(res.data);
				} else{
					wx.showToast({
						title:'返回出现异常',
						mask:false
					})
				}
			},
			fail(e) {
				reject(e);
			},
			complete() {
				uni.hideLoading();
			}
		}).catch(e => {
			console.log(e);
		})
	});
}

export default request;
