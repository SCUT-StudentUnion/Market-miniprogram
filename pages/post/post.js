import { area, sellOrBuy } from "../../i18n.js";
import { uploadFile, createGoods } from "../../api.js"

Page({
  data: {
    maxPhotoCount: 9,
    localPhotos: [],
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
      count: this.data.maxPhotoCount - this.data.localPhotos.length,
      success: res => {
        const newPhotos = res.tempFilePaths.map(path => ({ path }));
        this.setData({
          localPhotos: this.data.localPhotos.concat(newPhotos)
        });
      }
    });
  },
  onDeleteImage({ currentTarget }) {
    const photo = currentTarget.dataset.photo;
    wx.showModal({
      title: '要删除该图片吗？',
      success: res => {
        if (res.confirm) {
          this.setData({
            localPhotos: this.data.localPhotos.filter(p => p.path != photo.path)
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
  onSubmit(e) {
    let uploadedCount = 0;
    const updateLoading = () => {
      wx.showLoading({
        title: `上传图片(${uploadedCount}/${this.data.localPhotos.length})`,
        mask: true
      });
    }
    updateLoading();
    let uploadPromise = Promise.resolve();
    for (const localPhoto of this.data.localPhotos) {
      if (localPhoto.remoteId) {
        // already uploaded
        uploadedCount++;
        updateLoading();
        continue; 
      }
      uploadPromise = uploadPromise
        .then(() => uploadFile(localPhoto.path))
        .then(res => {
          localPhoto.remoteId = res.photoId;
          uploadedCount++;
          updateLoading();
        });
    }
    uploadPromise
      .then(() => {
        this.setData({
          'description.photos': this.data.localPhotos.map(p => ({id: p.remoteId}))
        });
        return createGoods(this.data.description);
      }).then(() => {
        wx.hideLoading();
        wx.showModal({
          title: '提交成功',
          content: '校会工作人员将为您尽快审核',
          showCancel: false
        })
      }).catch(e => {
        wx.hideLoading();
        wx.showToast({
          title: '发布失败:' + e,
          icon: 'none'
        })
      });
  }
})
