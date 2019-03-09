import { area, sellOrBuy } from "../../i18n.js";
import { getAllMy } from "../../api.js"

Page({
  data: {
    i18n: {
      area, sellOrBuy
    },
  },
  onLoad(options) {
    getAllMy().then(page => {
      this.setData({
        descriptions: page.content
      });
    })
  },
  onUpdate({currentTarget}) {
    const descriptionId = currentTarget.dataset.descriptionId;
    wx.navigateTo({
      url: `/pages/post/post?descriptionId=${descriptionId}`
    })
  }
})