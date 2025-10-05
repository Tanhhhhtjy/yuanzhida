export function saveSubjects(_subjects) {
  wx.setStorageSync('subjects', _subjects.sort((a, b) => a.id - b.id))
}
export function getSubjects() {
  return wx.getStorageSync('subjects') || []
}
export function getSubjectImage(id) {
  let res = getSubjects().filter((i) => i.id == id)[0].image
  console.log(res);
  return res
}