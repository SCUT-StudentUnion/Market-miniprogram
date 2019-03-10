const baseUri = "https://market-staging.huww98.cn/api";
// const baseUri = "http://localhost:8080";

const ErrorCode = {
  InvalidJwt: 'invalid-jwt',
}

export class ApiError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

function readApiResponse(response) {
  const json = response.data;
  if (response.statusCode != 200) {
    if (json.errorCode) {
      throw new ApiError(json.errorCode, json.message);
    }
    throw new Error("意外的错误");
  }
  return json;
}

function buildUri(path) {
  return baseUri + path;
}

function callApi(path, init) {
  let builtUri = buildUri(path);
  if (init && init.query) {
    const params = new URLSearchParams(init.query);
    builtUri += "?" + params;
    delete init.query;
  }
  return new Promise((resolve, reject) => {
    wx.request({
      ...init,
      url: builtUri,
      success: resolve,
      fail: reject
    })
  }).then(readApiResponse);
}

function callApiWithAuthorization(path, init) {
  const doCallApi = (jwt) => {
    const builtInit = init || {};
    builtInit.header = {
      "Authorization": "Bearer " + jwt,
      ...builtInit.header
    }
    return callApi(path, builtInit);
  }
  const loginAndCallApi = () => {
    return login().then(() => {
      doCallApi(getJwt())
    });
  }
  const jwt = getJwt();
  let callApiPromise;
  if(jwt) {
    return doCallApi(jwt).catch(e => {
      if (e.errorCode == "invalid-jwt") {
        logout();
        return loginAndCallApi()
      }
      throw e;
    });
  } else {
    return loginAndCallApi();
  }
}

function callApiWarpper(path, init) {
  if (init && init.withAuthorization) {
    delete init.withAuthorization;
    return callApiWithAuthorization(path, init);
  } else {
    return callApi(path, init);
  }
}

function getApi(path, init) {
  const builtInit = {
    method: 'GET',
    ...init
  }
  return callApiWarpper(path, builtInit);
}

function postApi(path, body, init) {
  const builtInit = {
    method: 'POST',
    ...init
  };
  if(body) {
    builtInit.data = body;
  }
  return callApiWarpper(path, builtInit);
}

const jwtStorageKey = "JWT";
export function getJwt() {
  return wx.getStorageSync(jwtStorageKey);
}

let loginPromise = null;

export function login() {
  if (loginPromise != null) {
    return loginPromise;
  }
  loginPromise = new Promise((resolve, reject) => {
    wx.login({
      success(res) {
        if (res.code) {
          resolve(res.code);
        } else {
          reject(res);
        }
      },
      fail: reject
    })
  }).then(code => postApi("/wechat/login", { code }))
  .then(result =>{
    wx.setStorageSync(jwtStorageKey, result.jwt);
    loginPromise = null;
  });
  return loginPromise;
}

export function logout() {
  wx.removeStorageSync(jwtStorageKey);
}

export function hasLogedIn() {
  return getJwt() !== null;
}

export function getAllCategories() {
  return getApi("/categories");
}

export function getAllGoodsInCategory(categoryId) {
  return getApi(`/categories/${categoryId}/goods`);
}

export function uploadFile(localPath) {
  const uri = buildUri('/wechat/uploadfile');
  return new Promise((resolve, reject) => wx.uploadFile({
    url: uri,
    filePath: localPath,
    name: 'file',
    success: resolve,
    fail: reject
  })).then(res => {
    res.data = JSON.parse(res.data)
    return readApiResponse(res);
  });
}

export function createGoods(goodsDescription) {
  return postApi('/goods', goodsDescription, { withAuthorization: true });
}

export function getAllFavorite() {
  return getApi('/goods/favorite', { withAuthorization: true });
}

export function deleteFromFavorite(goodsId) {
  return postApi(`/goods/${goodsId}/deleteFromFavorite`, null, { withAuthorization: true });
}

export function getGoods(id){
  return getApi(`/goods/${id}`);
}