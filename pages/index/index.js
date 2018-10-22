const app = getApp()

Page({
  data: {
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    inputShowed: false,
    inputVal: "",
    grids: [{
        id: 0,
        title: '发布二手信息',
        url: '/pages/post/post',
        icon:'',
      opentype:'switchTab'
      },
      {
        id: 1,
        title: "商品列表",
        url: "/pages/list/list",
        icon:'',
        opentype:'navigate'
      }, {
        id: 2,
        title: '商品详细信息',
        url: "/pages/detail/detail",
        icon:'',
        opentype: 'navigate'
      },
      {
        id: 3,
        title: '电子设备',
        url: "/pages/detail/detail",
        icon: '',
        opentype: 'navigate'
      },
      {
        id: 4,
        title: '日用品',
        url: "/pages/detail/detail",
        icon: '',
        opentype: 'navigate'
      },
      {
        id: 4,
        title: '二手书',
        url: "/pages/detail/detail",
        icon: '',
        opentype: 'navigate'
      }
    ],
    carousel:[
      {
        id:0,
        img:'/images/psb2.jpeg',
        url:'/pages/detail/detail'
      },
      {
        id: 1,
        img: '/images/psb.webp',
        url: '/pages/detail/detail'
      }
    ]
  },

  onLoad: function() {

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },
  showInput: function() {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function() {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function() {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function(e) {
    this.setData({
      inputVal: e.detail.value
    });
  }

})