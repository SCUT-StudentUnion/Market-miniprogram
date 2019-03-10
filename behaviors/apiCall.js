export default Behavior({
  data: {
    loading: false,
    loadingCount: 0
  },
  methods: {
    callApi(promise) {
      wx.showNavigationBarLoading();
      this.setData({
        loading: true,
        loadingCount: this.data.loadingCount + 1
      });
      const exitLoading = () => {
        const loadingCount = this.data.loadingCount - 1
        this.setData({
          loading: loadingCount > 0,
          loadingCount
        });
        if (!this.data.loading) {
          wx.hideNavigationBarLoading();
        }
      }
      return promise.then(result => {
        exitLoading();
        return result;
      }).catch(e => {
        exitLoading();
        throw e;
      });
    }
  }
})