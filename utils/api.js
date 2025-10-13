const util = require('./util')
const auth = require('./auth')
const { api, baseUrl } = require('./constant')
const validate = require('./validate')
function getHeader() {
  return {
    'username': auth.getUsername(),
    'token': auth.getToken()
  }
}
export function login(username, password, code, cookie) {
  let data = { 'username': username, 'password': password, 'code': code }
  return new Promise((resolve, reject) => {
    request({ method: api['login'].method, relativeUrl: api['login'].url, header: { 'cookie': cookie }, data: data })
      .then(res => resolve(res.token))
      .catch(reject)
  })
}
export function register(data) {
  let validate_result = validate.register(data)
  if (validate_result) return validate_result
  return request({ relativeUrl: api['register'].url, method: api['register'].method, data: data })
}
export function register_code(mail) {
  let validate_result = validate.mail_validate(mail)
  if (validate_result) return validate_result
  return request({ relativeUrl: api['register_code'].url, params: { mail: mail } })
}
export function login_code() {
  return new Promise((accept, reject) => {
    wx.downloadFile({
      url: baseUrl + api['login_code'].url,
      success: (res) => {
        let data = { 'filePath': res.tempFilePath, 'cookie': res.cookies[0] }
        accept(data)
      },
      fail: reject
    })
  })
}
export function questions(params) {
  return request({ relativeUrl: api['questions'].url, params: params })
}
export function subjects() {
  return request({ relativeUrl: api['subjects'].url })
}
export function uploadImages(filePaths) {
  return _uploadImagePromise(filePaths, 0, [])
}
function _uploadImagePromise(filePaths, index, outputList) {
  return new Promise((resolve, reject) => {
    if (filePaths.length == 0) {
      resolve([])
    }
    oss_upload(filePaths[index])
      .then(res => {
        outputList = outputList.concat(res)
        if (index + 1 < filePaths.length) {
          _uploadImagePromise(filePaths, index + 1, outputList)
            .then(resolve)
            .catch(reject)
        } else {
          resolve(outputList)
        }
      })
      .catch(reject)
  })
}
export function oss_upload(filePath) {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      filePath: filePath,
      name: 'file',
      url: baseUrl + api['oss_upload'].url,
      header: getHeader(),
      success: res => {
        let objData = JSON.parse(res.data)
        if (objData.code == 0) {
          resolve(objData.data)
        } else {
          reject(objData.message)
        }
      },
      fail: reject
    })
  })
}
export function questionDetail(id) {
  return request({ relativeUrl: api['questionDetail'].url + id, header: getHeader() })
}
export function comments(params) {
  return request({ relativeUrl: api['comments'].url, params: params, header: getHeader() })
}
export function newQuestion(data) {
  let validateResult = validate.newQuestion(data)
  if (validateResult) return validateResult
  return uploadImages(data['images'])
    .then(res => {
      let newImages = res.join(',')
      data['images'] = newImages
      return request({ relativeUrl: api['newQuestion'].url, method: api['newQuestion'].method, header: getHeader(), data: data })
    })
}
export function newAnswer(data) {
  return uploadImages(data['images'])
    .then(res => {
      let newImages = res.join(',')
      data['images'] = newImages
      return request({ relativeUrl: api['newAnswer'].url, method: api['newAnswer'].method, header: getHeader(), data: data })
    })
}
function request({ method = 'GET', relativeUrl, params = {}, header = null, data = null }) {
  let url = baseUrl + relativeUrl
  if (Object.keys(params)) {
    url = url + '?' + util.paramsUnion(params)
  }
  return new Promise((accept, reject) => {
    wx.request({
      url: url, method: method, header: header, data: data,
      success: (res) => {
        if (res.data.code == 0) {
          // here parse the data
          accept(res.data.data)
        } else if (res.data.message) {
          reject(res.data.message)
        } else {
          reject(res)
        }
      },
      fail: reject
    })
  })
}
export function likeQuestion(id, entityUserId) {
  return request({ relativeUrl: api['likeQuestion'].url, method: api['likeQuestion'].method, data: { id: id, entityUserId: entityUserId }, header: getHeader() })
}
export function likeComment(id, entityUserId) {
  return request({ relativeUrl: api['likeComment'].url, method: api['likeComment'].method, data: { id: id, entityUserId: entityUserId }, header: getHeader() })
}