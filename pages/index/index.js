const app = getApp();

Component({
  data: {
    active: 0,
    carousel: [{
        id: 0,
        img: '/images/s1.jpg',
        url: '/pages/detail/detail'
      },
      {
        id: 1,
        img: '/images/psb2.jpeg',
        url: '/pages/detail/detail'
      }
    ],
  },
  lifetimes: {
    attached() {
      app.globalData.allCategoriesPromise
        .then(categories => {
          this.setData({ categories })
        });
        this.loadList(0);
    },
  },
  pageLifetimes: {
    show() {
      const lists = this.selectAllComponents(".list");
      if (lists.every(l => !l.data.loadingNextPage)) {
        wx.stopPullDownRefresh();
      }
    },
  },
  methods: {
    activeList() {
      return this.selectComponent(`#list-${this.data.active}`);
    },
    onPullDownRefresh() {
      // Unload all lists but active one.
      this.setData({ 
        listLoaded: [],
        [`listLoaded[${this.data.active}]`]: true
      });
      this.activeList().onPullDownRefresh();
    },
    onReachBottom() {
      this.activeList().onReachBottom();
    },
    loadList(index) {
      this.setData({
        active: index,
        [`listLoaded[${index}]`]: true
      });
    },
    tabChange({ detail: {index} }) {
      this.loadList(index);
    },
  }
})