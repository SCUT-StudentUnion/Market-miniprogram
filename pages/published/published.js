import { area, sellOrBuy } from "../../i18n.js";
import { getAllMy } from "../../api.js"
import pagedContent from "../../behaviors/pagedContent.js"

Component({
  behaviors: [pagedContent],
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