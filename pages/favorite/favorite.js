import { getAllFavorite, deleteFromFavorite } from "../../api.js";

Page({
  data: {
  },
  onLoad(options) {
    this.loadFavorite();
  },
  loadFavorite() {
    return getAllFavorite().then(favorite => {
      this.setData({
        favorite: favorite.content
      });
    })
  },
  delete({currentTarget}) {
    const goodsId = currentTarget.dataset.goodsId;
    this.setData({
      favorite: this.data.favorite.filter(f => f.goods.id != goodsId)
    });
    deleteFromFavorite(goodsId).catch(e =>{
      wx.showToast({
        title: '删除失败:' + e,
        icon: 'none'
      })
      return this.loadFavorite()
    });
  }
})