Page({
  data: {
    list: ['出售', '求购'],
    result: ['出售'],
    checked:[],
    ShowTextarea:true,
    text: "data",
    message:"",
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
    place: [{
      name: "五山",
      isSelected: true
    }, {
      name: "大学城",
      isSelected: false
    }],
    img: [],
    detail: '',
    contact: '',
    bought: '',
    sell: '',
    category: 'electric',
    index: '',
    isAgree: '',
    show:""
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
  tapcat2: function (e) {
    for (var j = 0; j < this.data.place.length; j++) {
      this.data.place[j].isSelected = false;
    }
    var index = e.target.dataset.in;
    this.data.place[index].isSelected = true;
    this.setData({
      place: this.data.place,
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
  },
  onChange(event) {
    if (this.data.result[0] == "出售") {//js不能直接比较数组
      this.setData({
        result: ['求购']
      });
      console.log(this.data.result+"2");
    } else {
      this.setData({
        result: ['出售']
      });
      console.log(this.data.result+"1");
    }
    console.log(this.data.result);
  },
  PopShow(){

      this.setData({
        show:true,
        ShowTextarea:''
      });
  },
  ClosePop(){
    this.setData({
      show: "",
      ShowTextarea: true
    });
  },
  onClickButton(e){
    wx.showModal({
      title: '提交成功',
      content: '校会工作人员将为您尽快审核',
      showCancel:false
    })
  }
})
