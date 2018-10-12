App({
  globalData: {

  },
  onLaunch: function () {
    wx.login({
      success: res => {
        wx.request({
          url: 'https://market-staging.huww98.cn/api/wechat/login',
          method: 'POST',
          data: {
            code: res.code
          },
          success: function (loginResult) {
            console.log(loginResult.statusCode);
            console.log(loginResult.data);
          }
        });
      }
    });
  }
})
