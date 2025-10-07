const { OSS_HOST } = require('./constant')
export function add_oss_prefix(relativeUrl) {
  return `${OSS_HOST}${relativeUrl}`
}
export function add_oss_prefix_images(images) {
  return images.map(i => OSS_HOST + i)
}
export function add_oss_prefix_subjects(subjects) {
  let newList = []
  for (let i of subjects) {
    i['image'] = add_oss_prefix(i['image'])
    newList.push(i)
  }
  return newList
}
export function paramsUnion(params) {
  return Object.entries(params).map(([k, v]) => `${k}=${v}`).join('&')
}
export function shortText(text) {
  if (text.length > 50) {
    text = text.substr(0, 50) + '...'
  }
  return text
}
export function shortQuestionContent(questions) {
  let newQuestions = []
  for (let q of questions) {
    q.content = shortText(q.content)
    newQuestions.push(q)
  }
  return newQuestions
}
export function GenerateNumList(a, b) {
  let list = []
  for (let i = a; i <= b; i++)list.push(i)
  return list
}