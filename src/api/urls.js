
var domainObj = {
    "main-domain": "wx.waimai.meituan.com",
    "market-domain": "marketing.waimai.meituan.com"
}

var e = function(domainObj, obj) {
    return Object.keys(obj).reduce(function(total, currentValue) { // total,currentValue
        var currentUrl = obj[currentValue];
        currentUrl.indexOf("/weapp/") > -1 ? 
            total[currentValue] = "https://" + domainObj["main-domain"] + currentUrl 
            : currentUrl.indexOf("/o/wxapp/") > -1 ? total[currentValue] = "https://" + domainObj["market-domain"] + currentUrl 
            : total[currentValue] = "https://" + domainObj["main-domain"] + currentUrl;
        return total;
    }, {});
};
module.exports = function(p) {
    return e(p, {
        login: "/weapp/v1/account/login",
        uuid: "/weapp/v1/user/uuid/register",
        poiFilter: "/weapp/v2/poi/homepage",
        homeHead: "/weapp/v1/v8/home/head",
        poiFood: "/weapp/v1/poi/food",
        poiInfo: "/weapp/v1/poi/info",
        poiFoodCollect: "/weapp/v1/food/collect",
        spuTagProducts: "/weapp/v1/poi/sputag/products",
        poiCommentInfo: "/weapp/v1/comment/poi",
        gocomment: "/weapp/v1/comment/gocomment",
        commentsubmit: "/weapp/v1/comment/submit",
        channelPage: "/weapp/v2/poi/channelpage",
        getFilterConditions: "/weapp/v1/poi/getfilterconditions",
        searchPoi: "/weapp/v1/search/v9/poi",
        nonDelivery: "/weapp/v1/search/non-delivery/poi",
        searchSuggestV8: "/weapp/v1/search/v8/suggest",
        orders: "/weapp/v1/order/getuserorders",
        orderDetail: "/weapp/v1/order/detail",
        orderStatus: "/weapp/v2/order/status",
        orderHistoryStatus: "/weapp/v2/order/historystatus",
        orderPreview: "/weapp/v1/order/preview",
        orderUpdate: "/weapp/v1/order/update",
        orderDeliverTime: "/weapp/v1/order/getdeliverytime",
        orderSubmit: "/weapp/v1/order/submit",
        cancelRefundComplaints: "/weapp/v1/payment/refund/cancel",
        orderConfirmReceive: "/weapp/v1/order/confirmreceive",
        orderCancel: "/weapp/v1/order/cancel",
        privacyInfo: "/weapp/v1/privacy/info",
        privacyBinding: "/weapp/v1/privacy/binding",
        previewRiskCheckResendCode: "/weapp/v1/order/preview/riskcheck/resendcode",
        orderGetValidateCode: "/weapp/v1/order/getvalidatecode",
        orderValidate: "/weapp/v1/order/validate",
        posname: "/weapp/v1/user/address/posname",
        addrGet: "/weapp/v1/user/address/getaddr",
        addrEdit: "/weapp/v1/user/address/edit",
        addrSearch: "/weapp/v1/user/address/search",
        addrSuggest: "/weapp/v1/user/address/suggest",
        addrNear: "/weapp/v1/user/address/nearby",
        cityName: "/weapp/v1/user/address/cityname",
        getcityList: "/weapp/v1/user/address/opencities",
        nearAddr: "/weapp/v1/user/address/nearby",
        searchHot: "/weapp/v1/search/home/hotlabelandhistory",
        verifyCodeSend: "/weapp/v1/account/sendverifycode",
        verifyCodeCheck: "/weapp/v1/account/checkverifycode",
        getMyAccount: "/weapp/v1/account/getmyaccount",
        accountLogin: "/weapp/v1/account/login",
        accountLoginV2: "/weapp/v2/account/login",
        logout: "/weapp/v2/account/logout",
        appleMobileV2: "/weapp/v2/account/applybindmobile",
        bindMobileV2: "/weapp/v2/account/bindmobilelogin",
        ticketLoginV2: "/weapp/v2/account/ticketlogin",
        mobileLogin: "/weapp/v2/account/getwxmobilelogin",
        pay: "/weapp/v1/payment/pay",
        refundPreview: "/weapp/v1/payment/refund/preview",
        refundSubmit: "/weapp/v1/payment/refund/submit",
        refundComplaints: "/weapp/v1/payment/refund/genrefundrep",
        refundComplaintsSubmit: "/weapp/v1/payment/refund/repsubmit",
        refundDetail: "/weapp/v1/payment/refund/detail",
        refundStatus: "/weapp/v2/payment/refundstatus",
        complaintPreview: "/weapp/v2/payment/complaint/preview",
        complaintSubmit: "/weapp/v2/payment/complaint/submit",
        grabPoiCoupon: "/weapp/v1/activity/grabpoicoupon",
        getUserPoiCoupon: "/weapp/v1/user/poicoupons/getvalid",
        getCouponsList: "/weapp/v1/user/coupons/list",
        getValidCoupons: "/weapp/v1/user/coupons/getvalid",
        couponDisableReason: "/weapp/v1/user/coupons/disablereason",
        getFoodlist: "/weapp/v1/order/getfoodlist",
        poiShare: "/weapp/v1/external/ajax/poi",
        foodComment: "/weapp/v1/comment/share/poi",
        grabPoiCouponByPhone: "/weapp/v1/activity/grabPoiCouponByPhone",
        poiShareFood: "/weapp/v1/external/poi/food",
        foodShare: "/weapp/v1/external/ajax/food",
        brandPoiList: "/weapp/v1/poi/brandpoilist",
        poiQualification: "/weapp/v1/poi/qualification",
        refundApplyPreview: "/weapp/v1/payment/refund/preview",
        refundApplySubmit: "/weapp/v2/payment/refund/submit",
        refundApplyCalculate: "/weapp/v2/payment/refund/calculate",
        productInfo: "/weapp/v2/poi/product/info",
        cachemisscount: "/weapp/v1/uuid/cachemisscount",
        Muuid: "/weapp/v1/uuid",
        getThisCoupon: "/weapp/v1/activity/receivepoicoupon",
        bannerInfo: "/o/wxapp/home/marketing",
        getNewUserRedpackInfo: "/weapp/v1/newuser/entry"
    });
};