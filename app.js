import { login, getAllCategories } from "./api.js"

App({
  globalData: {
    allCategoriesPromise: getAllCategories()
  },
  onLaunch() {
    login();
  }
})
