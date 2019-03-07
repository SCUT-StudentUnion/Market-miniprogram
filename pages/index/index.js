import { getAllGoodsInCategory } from "../../api.js";

const app = getApp();

Page({
  data: {
    active: 0,
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
  },
  loadGoods() {
    const category = this.data.categories[this.data.active];
    getAllGoodsInCategory(category.id)
      .then(({ content }) =>{
        this.setData({
          goodsList: content
        });
      });
  },
  tabChange({ detail }) {
    this.setData({active: detail.index});
    this.loadGoods();
  },
  onLoad() {
    app.globalData.allCategoriesPromise
      .then(categories => this.setData({categories}))
      .then(this.loadGoods);
  },
  goto(e) {
    wx.navigateTo({
      url: '/pages/detail/detail'
    })
  }
})