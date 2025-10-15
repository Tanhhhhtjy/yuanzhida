const { OSS_HOST } = require('./constant')
function toVisibleImage(i) {
  if (i.startsWith('http') || i.startsWith('wxfile')) return i
  return `${OSS_HOST}${i}`
}
// used in page images-input
export function toVisibleImages(images) {
  return images.map(i => toVisibleImage(i))
}
function parseImageStr(s) {
  return s.length ? s.split(',') : []
}
// used in page detail,deal with the question
export function modifyItem(i) {
  i.images = toVisibleImages(parseImageStr(i.images))
  i.createTime = parseTime(i.createTime)
  return i
}
// used in page detail,deal with the comments
export function modifyItemList(l) {
  console.log(l);
  const newL = []
  for (const i of l) {
    i = modifyItem(i)
    newL.push(i)
  }
  return newL
}
// {k1:v1,k2:v2} -> k1=v1&k2=v2
// used in util api
export function paramsUnion(params) {
  return Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')
}
// longlonglonglonglonglong -> shortshortshort...
function shortText(text) {
  if (text.length > 50) {
    text = text.substr(0, 50) + '...'
  }
  return text
}
// question .content from "longlonglonglong" to "short..."
// used in page questions
export function parseQuestions(questions) {
  let newQuestions = []
  for (let q of questions) {
    q.createTime = parseTime(q.createTime)
    q.content = shortText(q.content)
    newQuestions.push(q)
  }
  return newQuestions
}
// 2,5 -> [2,3,4,5]
// used in page pagination
export function GenerateNumList(a, b) {
  let list = []
  for (let i = a; i <= b; i++)list.push(i)
  return list
}
// "2025-10-15T05:27:00.000+00:00" -> "2025-10-15 05:27"
function parseTime(time) {
  const t = new Date(time)
  return `${t.getFullYear()}-${('' + t.getMonth()).padStart(2, '0')}-${('' + t.getDate()).padStart(2, '0')} ${('' + t.getHours()).padStart(2, '0')}:${('' + t.getMinutes()).padStart(2, '0')}`
}