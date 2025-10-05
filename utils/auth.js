export function saveAuth(_username, _token) {
  wx.setStorageSync('username', _username)
  wx.setStorageSync('token', _token)
}
export function getToken() {
  return wx.getStorageSync('token') || ''
}
export function getUsername() {
  return wx.getStorageSync('username') || ''
}