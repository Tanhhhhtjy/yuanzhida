const api = require('./api')
const data = require('./data')
const util = require('./util')
const auth = require('./auth')
export function load_subjects() {
  api.subjects().then(res => {
    data.saveSubjects(util.add_oss_prefix_subjects(res))
  }).catch(err => {
    wx.showToast({
      title: err,
      icon: 'error'
    })
  })
}
export function auto_logout() {
  if (!auth.notExpire()) auth.logout()
  api.checkLogin().then(res => {
    if (!res) {
      auth.logout()
    }
  }).catch(err => {
    if (err == '用户未登录') {
      auth.logout()
      return
    }
    console.error(err);
  })
}