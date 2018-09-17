Page({
  data: {
    text: "data",
    types: [{
      name: "电子产品",
      isSelected: true
    }, {
      name: "生活用具",
      isSelected: false
    }, {
      name: "书籍教材",
      isSelected: false
    }],
    img: [],
    detail: '',
    contact: '',
    bought: '',
    sell: '',
    category: 'electric',
    index: '',
    isAgree: ''
  },
  onLoad: function() {},
  upimg: function() {
    var mythis = this;
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        mythis.setData({
          img: res.tempFilePaths
        });
      }
    });
  },
  askdel: function() {
    var mythis = this;
    wx.showModal({
      title: 'info',
      content: 'del?',
      success(res) {
        if (res.confirm == true) {
          mythis.setData({
            img: []
          });
        }
      }
    });
  },
  tapcat: function(e) {
    for (var j = 0; j < this.data.types.length; j++) {
      this.data.types[j].isSelected = false;
    }
    var index = e.target.dataset.in;
    this.data.types[index].isSelected = true;
    this.setData({
      types: this.data.types,
      index: index
    });
  },
  bindAgreeChange: function(e) {
    if (this.data.isAgree) {
      this.setData({
        isAgree: "" //checkbox[0]='agree'或者empty
      })
    } else {
      this.setData({
        isAgree: "ture" //checkbox[0]='agree'或者empty
      })
    }
  }
})
