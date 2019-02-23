import { getAllCategories } from "../../api.js"

Page({
  data: {
    categories: null,
    carousel: [{
      id: 0,
      img: '/images/s1.jpg',
      url: '/pages/detail/detail'
    },
    {
      id: 1,
      img: '/images/psb2.jpeg',
      url: '/pages/detail/detail'
    }],
    scroll_left: 0,
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
    }]
  },
  handleChange({ detail }) {
    this.setData({
      current: detail.key
    });
  },
  navigate(e) {
    console.log(e.target.dataset.id);
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + e.target.dataset.id
    })
  },
  onLoad() {
    getAllCategories().then(categories => {
      this.setData({categories});
    })
  },
  goto(e) {
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  }

})