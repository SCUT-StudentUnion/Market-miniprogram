import { area, sellOrBuy } from "../../i18n.js";

Component({
  properties: {
    goods: {
      type: Object,
      observer() {
        this.setData({
          "photosInList": this.data.goods.currentDescription.photos.slice(0, 3)
        });
      }
    }
  },
  data: {
    i18n: {
      area, sellOrBuy
    },
  },
})