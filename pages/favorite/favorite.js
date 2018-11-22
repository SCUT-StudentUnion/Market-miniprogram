// pages/favorite/favorite.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_list: [{
      id: 1,
      title: "小风车",
      description: "转呀转呀转",
      pic: "/images/timg.jpeg",
      place: "五山",
      price: 50
    }, {
      id: 2,
      title: "大蟑螂",
      description: "交通工具",
      pic: "/images/psb2.jpeg",
      place: "五山",
      price: 40
    },
    {
      id: 3,
      title: "二手书",
      description: "流通的二手书如果我超长会怎么样呢嘿嘿会怎么样呢怎么样呢如果再长一点呢",
      pic: "/images/d.jpg",
      place: "大学城",
      price: 30
    }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  askdel(e) {
    wx.showModal({
      title: '提示',
      content: '该收藏将从列表中被移除，您要继续吗？',
    })
  },
  goto: function (e) {
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  }
})