const auth = require('./auth')
export function saveSubjects(_subjects) {
  wx.setStorageSync('subjects', _subjects.sort((a, b) => a.id - b.id))
}
export function getSubjects() {
  return wx.getStorageSync('subjects') || []
}
export function getSubjectName(id) {
  let res = getSubjects().filter((i) => i.id == id)[0].name
  return res
}
export function getSubjectImage(id) {
  let res = getSubjects().filter((i) => i.id == id)[0].image
  return res
}
export function isOwn(username) {
  return username == auth.getUsername()
}