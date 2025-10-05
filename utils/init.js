const api = require('./api')
const data = require('./data')
const util = require('./util')
const auth = require('./auth')
export function load_subjects() {
  api.subjects().then(res => {
    data.saveSubjects(util.add_oss_prefix_subjects(res))
  })
}
export function auto_logout() {
  if (!auth.isLogin()) auth.logout()
}