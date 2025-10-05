export function register(data) {
  let { username, password, mail, code } = data
  return length_validate(username, '用户名', 3, 12) ||
    mail_validate(mail) ||
    length_validate(password, '密码', 8, 20) ||
    length_validate(code, 6, 6)
}
function length_validate(value = '', title, min_length, max_length) {
  if (value.length < min_length) {
    return Promise.reject(`${title}不足${min_length}字`)
  } else if (value.length > max_length) {
    return Promise.reject(`${title}超过${max_length}字`)
  } else {
    return false
  }
}
export function mail_validate(mail) {
  if (!(new RegExp(/^\d{8}@buaa.edu.cn$/).test(mail))) {
    return Promise.reject('邮箱不合要求')
  } else {
    return false
  }
}