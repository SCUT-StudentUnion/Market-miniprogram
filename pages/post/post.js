import { area, sellOrBuy } from "../../i18n.js";
import { uploadFile, createGoods, updateGoods, getMy } from "../../api.js"
import apiCall from '../../behaviors/apiCall.js'
import navigationBarLoading from "../../behaviors/navigationBarLoading.js"

const descriptionDefaults = {
  active: 'sell'
};

Component({
  behaviors: [apiCall, navigationBarLoading],
  properties: {
    descriptionId: Number
  },
  data: {
    maxPhotoCount: 9,
    localPhotos: [],
    i18n: {
      area,
      sellOrBuy,
    },
    description: {
      ...descriptionDefaults
    },
    sellOrBuy: Object.keys(sellOrBuy),
    area: Object.keys(area)
  },
  lifetimes: {
    attached() {
      if (this.data.descriptionId) {
        this.callApi(getMy(this.data.descriptionId)).then(({ goods, photos, ...description }) => {
          this.setData({
            description,
            goods,
            localPhotos: photos.map(p => ({ path: p.url, remoteId: p.id }))
          });
        })
      }
    },
  },
  methods: {
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
      const value = e.detail.value;
      for (const k of Object.keys(sellOrBuy)) {
        delete value[k];
      }
      this.setData({
        description: {
          ...this.data.description,
          ...value,
          weChatFormId: e.detail.formId
        }
      })

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
      const submitPromise = uploadPromise.then(() => {
        this.setData({
          'description.photos': this.data.localPhotos.map(p => ({ id: p.remoteId }))
        });
        if (this.data.goods) {
          return updateGoods(this.data.goods.id, this.data.description);
        } else {
          return createGoods(this.data.description);
        }
      })
      
      this.callApi(submitPromise).then(() => {
        wx.hideLoading();
        wx.showModal({
          title: '提交成功',
          content: '校会工作人员将为您尽快审核',
          showCancel: false,
          success() {
            wx.navigateBack();
          }
        })
      }).catch(e => {
        wx.hideLoading();
        wx.showToast({
          title: '发布失败:' + e,
          icon: 'none'
        })
      });
    }
  }
})
