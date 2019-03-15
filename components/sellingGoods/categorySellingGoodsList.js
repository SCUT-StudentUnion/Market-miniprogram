import { getAllGoodsInCategory } from "../../api.js";
import pagedContent from "../../behaviors/pagedContent.js"

Component({
  behaviors: [pagedContent],
  options: {
    addGlobalClass: true,
  },
  properties: {
    categoryId: Number
  },
  data: {
  },
  methods: {
    doLoadPage(pageToLoad) {
      return getAllGoodsInCategory(this.data.categoryId, pageToLoad);
    },
  }
})
