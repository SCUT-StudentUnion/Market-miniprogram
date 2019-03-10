import apiCall from './apiCall.js'

export default Behavior({
  behaviors: [apiCall],
  data: {
    totalPages: 0,
    loadedPages: 0,
    loadingNextPage: false,
    isLastPage: false,
    content: null
  },
  lifetimes: {
    attached() {
      this.loadFirstPage();
    },
  },
  methods: {
    doLoadPage(pageToLoad) {
      throw "Must be overrided";
    },
    loadFirstPage() {
      this.setData({ loadingNextPage: true });
      this.loadingPromise = this.callApi(this.doLoadPage(0))
        .then(({ totalPages, content }) => {
          const loadedPages = 1;
          this.setData({
            totalPages,
            loadedPages,
            isLastPage: loadedPages >= totalPages,
            loadingNextPage: false,
            content
          });
          this.loadingPromise = null;
        }).catch(e => {
          this.setData({ loadingNextPage: false });
          this.loadingPromise = null;
          throw e;
        })
      return this.loadingPromise;
    },
    loadNextPage() {
      if (this.data.isLastPage) {
        return Promise.resolve();
      }
      if (this.loadingPromise) {
        return this.loadingPromise;
      }
      this.setData({ loadingNextPage: true });
      this.loadingPromise = this.callApi(this.doLoadPage(this.data.loadedPages))
        .then(({totalPages, content}) => {
          const loadedPages = this.data.loadedPages + 1;
          const newData = { 
            totalPages,
            loadedPages,
            isLastPage: loadedPages > totalPages,
            loadingNextPage: false
          };
          const previousLength = (this.data.content || []).length;
          content.forEach((item, index) => {
            newData[`content[${previousLength + index}]`] = item
          });
          this.setData(newData)
          this.loadingPromise = null;
        }).catch(e => {
          this.setData({ loadingNextPage: false });
          this.loadingPromise = null;
          throw e;
        })
      return this.loadingPromise;
    },
    onReachBottom() {
      this.loadNextPage();
    },
    onPullDownRefresh() {
      this.loadFirstPage().then(() => {
        wx.stopPullDownRefresh();
      });
    }
  }
})