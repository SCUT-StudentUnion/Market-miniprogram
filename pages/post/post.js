import { area, sellOrBuy } from "../../i18n.js";

Page({
  data: {
    i18n: {
      area,
      sellOrBuy,
    },
    description: {
      active: 'sell'
    },
    sellOrBuy: Object.keys(sellOrBuy),
    area: Object.keys(area)
  },
  onLoad() {
  },
  selectCategory() {
    wx.navigateTo({
      url: 'selectCategory',
    });
  },
  selectArea() {
    wx.navigateTo({
      url: 'selectArea',
    });
  },
  onSelectImage() {
    wx.chooseImage({
      count: 9,
      success: res => {
        this.setData({
          localPhotos: res.tempFilePaths
        });
      }
    });
  },
  onDeleteImage({ currentTarget }) {
    const src = currentTarget.dataset.src;
    wx.showModal({
      title: '要删除该图片吗？',
      success: res => {
        if (res.confirm) {
          this.setData({
            localPhotos: this.data.localPhotos.filter(s => s != src)
          });
        }
      }
    });
  },
  onFieldChange({ currentTarget, detail }) {
    const fieldName = `description.${currentTarget.dataset.fieldName}`;
    this.setData({
      [fieldName]: detail
    });
  },
  onClickButton(e) {
    wx.showModal({
      title: '提交成功',
      content: '校会工作人员将为您尽快审核',
      showCancel: false
    })
  }
})
