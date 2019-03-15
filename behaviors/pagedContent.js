import apiCall from './apiCall.js'

const pagedContent = Behavior({
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
    /**
     * @returns {Promise}
     */
    doLoadPage(pageToLoad) {
      throw "Must be overrided";
    },
    /**
     * @private
     * @param {Promise<{}>} promise - Resolve to new data to be passed to setData.
     */
    _loadPage(promise) {
      this.setData({ loadingNextPage: true });
      this.loadingPromise = this.callApi(promise)
        .then(newData => {
          newData.isLastPage = newData.loadedPages >= newData.totalPages,
          newData.loadingNextPage = false;
          this.setData(newData);
          this.loadingPromise = null;
        }, e => {
          this.setData({ loadingNextPage: false });
          this.loadingPromise = null;
          throw e;
        });
      return this.loadingPromise;
    },
    loadFirstPage() {
      const loadPagePromise = this.doLoadPage(0)
        .then(({ totalPages, content }) => {
          const loadedPages = 1;
          return {
            totalPages,
            loadedPages,
            content
          };
        });
      return this._loadPage(loadPagePromise);
    },
    loadNextPage() {
      if (this.data.isLastPage) {
        return Promise.resolve();
      }
      if (this.loadingPromise) {
        return this.loadingPromise;
      }
      const loadPagePromise = this.doLoadPage(this.data.loadedPages)
        .then(({ totalPages, content }) => {
          const newData = {
            totalPages,
            loadedPages: this.data.loadedPages + 1,
          };
          const previousLength = (this.data.content || []).length;
          content.forEach((item, index) => {
            newData[`content[${previousLength + index}]`] = item
          });
          return newData;
        })
      return this._loadPage(loadPagePromise);
    },
    onReachBottom() {
      this.loadNextPage();
    },
    onPullDownRefresh() {
      const stopRefresh = () => {
        wx.stopPullDownRefresh()
      }
      this.loadFirstPage().then(stopRefresh, stopRefresh);
    }
  }
})

export default pagedContent;
export const pagedContentSyncStateOnLoad = Behavior({
  behaviors: [pagedContent],
  pageLifetimes: {
    show() {
      if (!this.data.loadingNextPage) {
        wx.stopPullDownRefresh();
      }
    },
  },
});