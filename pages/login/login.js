var api = require('../../utils/api.js')
var auth = require('../../utils/auth.js')
Page({
  data: {
    outputItems: {},
    captchaShow: false
  },
  onLoad: function () {
    this.selectComponent('#input-group').initData({
      inputItems: [
        { type: 'text', key: 'username', label: '用户名' },
        { type: 'text', key: 'password', label: '密码', password: true }]
    })
  },
  showCaptcha: function () {
    this.setData({ captchaShow: true })
  },
  onInput: function (e) {
    this.setData({ outputItems: e.detail })
  },
  onSubmitLogin: function (e) {
    const { username, password } = this.data.outputItems
    const { code, cookie } = e.detail
    api.login({ username, password, code, cookie }).then(res => {
      auth.saveAuth(username, res)
      wx.showToast({
        title: '登录成功',
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/subjects/subjects',
        })
      }, 1500);
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'error'
      })
    })
  },
  hideCaptcha: function () {
    this.setData({ 'captchaShow': false })
  }
})