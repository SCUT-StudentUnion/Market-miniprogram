export default Behavior({
  data: {
    loading: false,
    loadingCount: 0
  },
  methods: {
    callApi(promise) {
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
      }
      promise.then(exitLoading, exitLoading);
      return promise;
    }
  }
})