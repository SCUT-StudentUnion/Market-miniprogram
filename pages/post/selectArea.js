import { area } from "../../i18n.js";

Page({
  data: {
    i18n: {
      area,
    },
    area: Object.keys(area),
  },
  onAreaSelected({ currentTarget }) {
    const pages = getCurrentPages()
    const previousPage = pages[pages.length - 2];
    previousPage.setData({
      'description.area': currentTarget.dataset.area
    });
    wx.navigateBack();
  }
})