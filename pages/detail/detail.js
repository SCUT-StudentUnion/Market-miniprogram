Page({

  /**
   * 页面的初始数据
   */
  data: {
    text: 0,
    detail:{
      isCollected:"已收藏",
      title:"网球拍大甩卖",
      description:'11成新网球拍',
      OldPrice:"¥666",
      NewPrice:"¥233",
      wxid:"wxid_abcdefg",
      contact:"23333"
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      text: options.id
    })
    wx.request({
      url: '',
      data: {
        id: this.data.text
      },
      success(res) {
        this.setData({
          detail: res
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})