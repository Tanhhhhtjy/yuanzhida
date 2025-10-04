export function saveAuth(_username, _token) {
  wx.setStorageSync('username', _username)
  wx.setStorageSync('token', _token)
}
function getToken() {
  return wx.getStorageSync('token') || ''
}
function getUsername() {
  return wx.getStorageSync('token') || ''
}