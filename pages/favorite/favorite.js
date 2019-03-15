import { getAllFavorite, deleteFromFavorite } from "../../api.js";
import { pagedContentSyncStateOnLoad } from "../../behaviors/pagedContent.js"
import navigationBarLoading from "../../behaviors/navigationBarLoading.js"

Component({
  behaviors: [pagedContentSyncStateOnLoad, navigationBarLoading],
  data: {
  },
  methods: {
    doLoadPage(pageToLoad) {
      return getAllFavorite(pageToLoad);
    },
    delete({ currentTarget }) {
      const goodsId = currentTarget.dataset.goodsId;
      this.setData({
        content: this.data.content.filter(f => f.goods.id != goodsId)
      });
      this.callApi(deleteFromFavorite(goodsId)).catch(e => {
        wx.showToast({
          title: '删除失败:' + e,
          icon: 'none'
        })
      });
    }
  },
})