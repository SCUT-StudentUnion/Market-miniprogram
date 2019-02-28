Page({
  data: {
    text: 0,
    detail:{
      isCollected:"已收藏",
      title:"网球拍大甩卖",
      description:'11成新网球拍hahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      OldPrice:"¥666",
      NewPrice:"¥233",
      wxid:"wxid_abcdefg",
      contact:"23333",
      place:"五山"
    },
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
    ]
  },
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
})