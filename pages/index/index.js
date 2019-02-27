import { getAllGoodsInCategory } from "../../api.js";
import { area, sellOrBuy } from "../../i18n.js";

const app = getApp();

Page({
  data: {
    i18n: {
      area, sellOrBuy
    },
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
        content.forEach(g => {
          g.currentDescription.photosInList = g.currentDescription.photos.slice(0,3);
        });
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