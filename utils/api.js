const util = require('./util')
const auth = require('./auth')
const { baseUrl, OSS_HOST, api } = require('./constant')
const validate = require('./validate')
function getHeader() {
  return { 'username': auth.getUsername(), 'token': auth.getToken() }
}
export function login(d) {
  const { cookie, ...newD } = d
  return request({ method: api['login'].method, url: api['login'].url, header: { 'cookie': cookie }, data: newD }).then(res => res.token)
}
export function register(data) {
  let validate_result = validate.register(data)
  if (validate_result) return validate_result
  return request({ url: api['register'].url, method: api['register'].method, data: data })
}
export function register_code({ mail }) {
  let validate_result = validate.mail_validate(mail)
  if (validate_result) return validate_result
  return request({ url: api['register_code'].url, params: { mail: mail } })
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
  return request({ url: api['questions'].url, params: params })
}
export function subjects() {
  return request({ url: api['subjects'].url })
}
function ImagesMiddleware(item) {
  return _uploadImagePromise(item.images, 0, []).then(res => {
    let newImages = res.join(',')
    item.images = newImages
    return item
  })
}
function _uploadImagePromise(filePaths, index, outputList) {
  return new Promise((resolve, reject) => {
    if (filePaths.length == 0) resolve([])
    let filePath = filePaths[index]
    // https://oss.com/image.png
    if (filePath.startsWith('https')) {
      filePath = filePath.substring(OSS_HOST.length)
    }
    // http://tmp wxfile://tmp__123.png
    if (filePath.startsWith('http') || filePath.startsWith('wxfile')) {
      oss_upload(filePath).then(res => {
        outputList = outputList.concat(res)
        if (index + 1 < filePaths.length) {
          _uploadImagePromise(filePaths, index + 1, outputList).then(resolve).catch(reject)
        } else resolve(outputList)
      }).catch(reject)
      return
    }
    // 2025/12/12/image.png
    outputList = outputList.concat(filePath)
    if (index + 1 < filePaths.length) {
      _uploadImagePromise(filePaths, index + 1, outputList).then(resolve).catch(reject)
    } else resolve(outputList)
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
  return request({ url: api['questionDetail'].url + id, header: getHeader() })
}
export function comments(params) {
  return request({ url: api['comments'].url, params: params, header: getHeader() })
}
export function newQuestion(data) {
  let validateResult = validate.newQuestion(data)
  if (validateResult) return validateResult
  return ImagesMiddleware(data).then(res => {
    return request({ url: api['newQuestion'].url, method: api['newQuestion'].method, header: getHeader(), data: res })
  })
}
export function newAnswer(d) {
  return ImagesMiddleware(d).then(res => {
    request({ url: api['newAnswer'].url, method: api['newAnswer'].method, header: getHeader(), data: res })
  })
}
function request({ method = 'GET', url, params = {}, header = null, data = null }) {
  let finalUrl = baseUrl + url
  if (Object.keys(params)) {
    finalUrl = finalUrl + '?' + util.paramsUnion(params)
  }
  return new Promise((accept, reject) => {
    wx.request({
      url: finalUrl, method: method, header: header, data: data,
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
  return request({ url: api['likeQuestion'].url, method: api['likeQuestion'].method, data: { id: id, entityUserId: entityUserId }, header: getHeader() })
}
export function likeComment(id, entityUserId) {
  return request({ url: api['likeComment'].url, method: api['likeComment'].method, data: { id: id, entityUserId: entityUserId }, header: getHeader() })
}
export function checkLogin() {
  return request({ url: api.checkLogin.url, params: { username: auth.getUsername(), token: auth.getToken() }, header: getHeader() })
}
export function flagSolved(id, isSolved) {
  return request({ url: api.flagSolved.url, method: api.flagSolved.method, header: getHeader(), data: { id: id, isSolved: isSolved } })
}
export function flagUseful(id) {
  return request({ url: api.flagUseful.url, method: api.flagUseful.method, header: getHeader(), data: { id: id } })
}
export function keywordSuggest(s) {
  return request({ url: api.keywordSuggest.url, params: { keyword: s } })
}
export function deleteQuestion(id) {
  return request({ url: api.deleteQuestion.url, method: api.deleteQuestion.method, header: getHeader(), params: { id: id } })
}
export function deleteComment(id) {
  return request({ url: api.deleteComment.url, method: api.deleteComment.method, header: getHeader(), params: { id: id } })
}
export function correctComment(data) {
  return ImagesMiddleware(data).then(res => {
    return request({ url: api.correctComment.url, method: api.correctComment.method, header: getHeader(), data: res })
  })
}
export function correctQuestion(d) {
  console.log(d);
  return ImagesMiddleware(d).then(res => {
    const { url, method } = api.correctQuestion
    return request({ url, method, header: getHeader(), data: res })
  })
}
export function myQuestions(p) {
  const { url } = api.myQuestions
  return request({ url, header: getHeader(), params: p })
}
export function myComments(p) {
  const { url } = api.myComments
  return request({ url, header: getHeader(), params: p })
}
export function collectedQuestions(p) {
  const { url } = api.collectedQuestions
  return request({ url, header: getHeader(), params: p })
}
export function sendResetPasswordCode({ mail }) {
  let validate_result = validate.mail_validate(mail)
  if (validate_result) return validate_result
  return request({ url: api['sendResetPasswordCode'].url, params: { mail: mail } })
}
export function resetPassword({ username, code, newPassword }) {
  const { url, method } = api['resetPassword']
  return request({ url, method, data: { username, code, newPassword } })
}
export function historyQuestions(p) {
  const { url } = api.historyQuestions
  return request({ url, header: getHeader(), params: p })
}