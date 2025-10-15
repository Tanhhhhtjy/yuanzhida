const { OSS_HOST } = require('./constant')
export function add_oss_prefix(relativeUrl) {
  return relativeUrl.startsWith('http') ? relativeUrl : `${OSS_HOST}${relativeUrl}`
}
export function parseImages(l) {
  return l ? l.split(',').map(i => add_oss_prefix(i)) : []
}
export function add_oss_prefix_images(images) {
  return images.map(add_oss_prefix)
}
export function add_oss_prefix_subjects(subjects) {
  let newList = []
  for (let i of subjects) {
    i['image'] = add_oss_prefix(i['image'])
    newList.push(i)
  }
  return newList
}
export function add_oss_prefix_comments(records) {
  let newRecords = []
  for (let record of records) {
    record.images = parseImages(record.images)
    newRecords.push(record)
  }
  return newRecords
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
export function parseQuestionItem(questions) {
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
export function parseTime(time) {
  const t = new Date(time)
  return `${t.getFullYear()}-${('' + t.getMonth()).padStart(2, '0')}-${('' + t.getDate()).padStart(2, '0')} ${('' + t.getHours()).padStart(2, '0')}:${('' + t.getMinutes()).padStart(2, '0')}`
}