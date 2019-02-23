import { login } from "./api.js"

App({
  globalData: {

  },
  onLaunch() {
    login();
  }
})
