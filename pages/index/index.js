import { getAllGoodsInCategory } from "../../api.js";
import pagedContent from "../../behaviors/pagedContent.js"

const app = getApp();

Component({
  behaviors: [pagedContent],
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
  methods: {
    doLoadPage(pageToLoad) {
      if (!this.categoryPromise) {
        this.categoryPromise = app.globalData.allCategoriesPromise
          .then(categories => {
            this.setData({ categories })
          });
      }
      return this.categoryPromise.then(() => {
        const category = this.data.categories[this.data.active];
        return getAllGoodsInCategory(category.id, pageToLoad)
      });
    },
    onReachBottom() {
      this.loadNextPage();
    },
    tabChange({ detail }) {
      this.setData({ active: detail.index });
      this.loadFirstPage();
    },
    goto(e) {
      wx.navigateTo({
        url: '/pages/detail/detail'
      })
    }
  }
})