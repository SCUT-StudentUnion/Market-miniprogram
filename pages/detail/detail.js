import {
  getGoods
} from "../../api.js";
import { area, sellOrBuy } from "../../i18n.js";
Page({
  data: {
    text: 2,
    detail: {
      isCollected: "已收藏",
      title: "网球拍大甩卖",
      description: '11成新网球拍hahahahah哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
      OldPrice: "¥666",
      NewPrice: "¥233",
      userid: "wxid_abcdefg",
      contact: "23333",
      place: "五山"
    },
    carousel: [
    ]
  },
  onLoad: function(options) {
    this.setData({
      text: options.id
    })
    getGoods(this.data.text).then((
      res
    ) => {
      console.log(res)
      let desc = res.currentDescription;
      this.setData({
        'detail.title': desc.title,
        'detail.description': desc.detail,
        'detail.place': (() => {
          return area[desc.area]

        })(),
        'detail.contact': `联系方式: ${ desc.contactInfo }`,
        'detail.NewPrice': desc.sellingPrice,
        'detail.userid': `用户id:${res.releasedBy.id}`,
        'carousel':desc.photos

      })
    })
  },
})