// pages/issue/issue.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods_list: [{
      id: 1,
      title: "小风车",
      description: "转呀转呀转",
      pic: "/images/upload.png",
      status:1//active or denied
    }, {
      id: 2,
      title: "大蟑螂",
      description: "交通工具",
      pic: "/images/upload.png",
      status:1
    },
    {
      id: 3,
      title: "二手书",
      description: "流通的二手书",
      pic: "/images/upload.png",
      status:1
    },
      {
        id: 4,
        title: "小黄书😼",
        description: "小黄车使用手册",
        pic: "/images/upload.png",
        status: 0
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

  }
})