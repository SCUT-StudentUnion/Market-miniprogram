const app = getApp();

Page({
  data: {
  },
  onLoad(options) {
    app.globalData.allCategoriesPromise
      .then(categories => this.setData({ categories }));
  },
  onCategorySelected({ currentTarget }) {
    const pages = getCurrentPages()
    const previousPage = pages[pages.length - 2];
    previousPage.setData({
      'description.category': currentTarget.dataset.category
    });
    wx.navigateBack();
  }
})