export default Behavior({
  observers: {
    loading() {
      this.syncNavigationBarLoading();
    }
  },
  pageLifetimes: {
    show() {
      this.syncNavigationBarLoading();
    },
  },
  methods: {
    syncNavigationBarLoading() {
      if (this.data.loading) {
        wx.showNavigationBarLoading();
      } else {
        wx.hideNavigationBarLoading();
      }
    }
  }
})