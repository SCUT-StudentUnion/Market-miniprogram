const baseUri = "http://localhost:8080";

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

function callApi(path, query, init) {
  const builtInit = init || {};
  const jwt = getJwt();
  if (jwt) {
    builtInit.header = {
      "Authorization": "Bearer " + jwt,
      ...builtInit.header
    }
  }
  let builtUri = baseUri + path;
  if (query) {
    const params = new URLSearchParams(query);
    builtUri += "?" + params;
  }
  builtInit.url = builtUri;
  return new Promise((resolve, reject) => {
    wx.request({
      ...builtInit,
      url: builtUri,
      success: resolve,
      fail: reject
    })
  }).then(readApiResponse);
}

function getApi(path, query, init) {
  return callApi(path, query, {
    method: 'GET',
    ...init
  })
}

function postApi(path, body, query, init) {
  const builtInit = {
    method: 'POST',
    data: body,
    ...init
  };
  return callApi(path, query, builtInit);
}

const jwtStorageKey = "JWT";
export function getJwt() {
  return wx.getStorageSync(jwtStorageKey);
}

export function login() {
  return new Promise((resolve, reject) => {
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
  .then(result => wx.setStorageSync(jwtStorageKey, result.jwt));
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