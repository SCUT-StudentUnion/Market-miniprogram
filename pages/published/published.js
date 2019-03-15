import { area, sellOrBuy } from "../../i18n.js";
import { getAllMy } from "../../api.js"
import { pagedContentSyncStateOnLoad } from "../../behaviors/pagedContent.js"
import navigationBarLoading from "../../behaviors/navigationBarLoading.js"

Component({
  behaviors: [pagedContentSyncStateOnLoad, navigationBarLoading],
  data: {
    i18n: {
      area, sellOrBuy
    },
  },
  methods: {
    doLoadPage(pageToLoad) {
      return getAllMy(pageToLoad);
    },
    onUpdate({ currentTarget }) {
      const descriptionId = currentTarget.dataset.descriptionId;
      wx.navigateTo({
        url: `/pages/post/post?descriptionId=${descriptionId}`
      })
    }
  }
})