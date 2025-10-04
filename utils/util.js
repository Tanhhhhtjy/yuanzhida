const OSS_HOST = 'https://yuanzhida-cos-1352975306.cos.ap-beijing.myqcloud.com/'
export function add_oss_prefix(relativeUrl) {
  return `${OSS_HOST}${relativeUrl}`
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