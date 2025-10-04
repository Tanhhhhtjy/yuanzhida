const util = require('./util')
export function login(username, password, code, cookie) {
  let data = { 'username': username, 'password': password, 'code': code }
  return new Promise((resolve, reject) => {
    request({ method: api['login'].method, relativeUrl: api['login'].url, header: { 'cookie': cookie }, data: data }).then(res => resolve(res.token)).catch(e => { reject(e) })
  })
}
export function login_code() {
  return new Promise((accept, reject) => {
    wx.downloadFile({
      url: baseUrl + api['login_code'].url,
      success: (res) => {
        let data = { 'filePath': res.tempFilePath, 'cookie': res.cookies[0] }
        accept(data)
      }, fail: err => { reject(err) }
    })
  })
}
export function questions(params) {
  return request({ relativeUrl: api['questions'].url, params: params })
}
export function subjects(params) {
  return request({ relativeUrl: api['subjects'].url })
}
const baseUrl = 'http://43.143.231.162:8000'
let token = ''
let username = ''
const api = {
  'login': { 'url': '/api/answerly/v1/user/login', 'method': 'POST' },
  'register': { 'url': '/api/answerly/v1/user', 'method': 'POST' },
  'login_code': { 'url': '/api/answerly/v1/user/captcha' },
  'register_code': { 'url': '/api/answerly/v1/user/send-code' },
  'subjects': { 'url': '/api/answerly/v1/category' },
  'questions': { 'url': '/api/answerly/v1/question/page' }
}
function request({ method = 'GET', relativeUrl, params = {}, header = null, data = null }) {
  let url = baseUrl + relativeUrl
  if (Object.keys(params)) {
    url = url + '?' + util.paramsUnion(params)
  }
  return new Promise((accept, reject) => {
    wx.request({
      url: url,
      method: method,
      header: header,
      data: data
      , success: (res) => {
        if (res.data.code == 0) {
          accept(res.data.data)
        } else {
          reject(res)
        }
      }, fail: (err) => {
        reject(err)
      }
    })
  })
}