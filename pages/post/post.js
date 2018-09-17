Page({
  data: {
    text: "data",
    types: [{
      name: "电子产品",
      status: 'selected'
    }, {
      name: "生活用具",
      status: 'category'
    }, {
      name: "书籍教材",
      status: 'category'
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
  sync0: function(e) {

    this.setData({
      detail: e.detail.value
    })
  },
  sync1: function(e) {

    this.setData({
      contact: e.detail.value
    })
  },
  sync2: function(e) {

    this.setData({
      bought: e.detail.value
    })
  },
  sync3: function(e) {

    this.setData({
      sell: e.detail.value
    })
  },
  tapcat: function(e) {
    for (var j = 0; j < this.data.types.length; j++) {
      this.data.types[j].status = 'category';
    }
    var index = e.target.dataset.in;
    this.data.types[index].status = 'selected';
    this.setData({
      types: this.data.types,
      index: index
    })

  },
  bindAgreeChange: function(e) {
    if (this.data.isAgree) {
      this.setData({
        isAgree: "" //checkbox[0]='agree'或者empty
      })
    }
    else{
      this.setData({
        isAgree: "ture" //checkbox[0]='agree'或者empty
      })
    }
  },
  commit:function(){

  }

})