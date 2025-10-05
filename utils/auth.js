export function saveAuth(_username, _token) {
  wx.setStorageSync('username', _username)
  wx.setStorageSync('token', _token)
  wx.setStorageSync('login_time', Date.now())
}
export function getToken() {
  return wx.getStorageSync('token') || ''
}
export function getUsername() {
  return wx.getStorageSync('username') || ''
}
export function logout() {
  wx.removeStorageSync('login_time')
  wx.removeStorageSync('username')
  wx.removeStorageSync('token')
}
export function isLogin() {
  let login_time = wx.getStorageSync('login_time') || 0
  if (Date.now() < login_time + 28 * 24 * 60 * 60 * 1000) {
    return true
  }
  return false
}