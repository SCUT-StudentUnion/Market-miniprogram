const app = getApp()

Page({
  data: {
    current: 'homepage',
    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',
    category:['全部','图书文具','寝室用品','数码电子','服装美妆','运动健身','其他'],
    carousel: [{
        id: 0,
        img: '/images/s1.jpg',
        url: '/pages/detail/detail'
      },
      {
        id: 1,
        img: '/images/psb2.jpeg',
        url: '/pages/detail/detail'
      }
    ],
    scroll_left: 0,
    goods_list: [{
      id: 1,
      title: "小风车",
      description: "转呀转呀转",
      pic: "/images/timg.jpeg",
      place:"五山",
      price:50
    }, {
      id: 2,
      title: "大蟑螂",
      description: "交通工具",
        pic: "/images/psb2.jpeg",
        place: "五山",
        price:40
    },
    {
      id: 3,
      title: "二手书",
      description: "流通的二手书如果我超长会怎么样呢嘿嘿会怎么样呢怎么样呢如果再长一点呢",
      pic: "/images/d.jpg",
      place: "大学城",
      price:30
    }
    ]
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  navigate:function(e){
    console.log(e.target.dataset.id);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.target.dataset.id
    })
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
  goto: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  }

})