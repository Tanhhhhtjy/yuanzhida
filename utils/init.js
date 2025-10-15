const api = require('./api')
const data = require('./data')
const util = require('./util')
const auth = require('./auth')
const interact = require('./interact')
export function load_subjects() {
  api.subjects().then(res => {
    data.saveSubjects(util.modifyCategories(res.sort((a, b) => a.id - b.id)))
  }).catch(interact.errorToast)
}
export function auto_logout() {
  if (!auth.notExpire()) auth.logout()
  api.checkLogin().then(res => {
    if (!res) auth.logout()
  }).catch(err => {
    if (err == '用户未登录') {
      auth.logout()
      return
    }
    console.error(err);
  })
}