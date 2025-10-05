var api = require('../../utils/api.js')
var auth = require('../../utils/auth.js')
Page({
  data: {
    inputItems: [
      { type: 'text', key: 'username', title: '用户名' },
      { type: 'text', key: 'password', title: '密码' }],
    outputItems: {},
    'code': '',
    'cookie': '',
    'captcha_show': false,
    'toptipText': ''
  },
  onSubmit: function () {
    this.setData({ 'captcha_show': true })
  },
  onInput: function (e) {
    this.setData({ 'outputItems': e.detail })
  },
  submit_login: function (e) {
    api.login(this.data.outputItems['username'], this.data.outputItems['password'], e.detail.code, e.detail.cookie).then(res => {
      auth.saveAuth(this.data.outputItems['username'], res)
      wx.showToast({
        title: '登录成功',
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/subjects/subjects',
        })
      }, 2000);
    }).catch(e => {
      wx.showModal({
        title: '登录失败',
        content: e
      })
    })
  },
  captcha_hide: function () {
    this.setData({ 'captcha_show': false })
  }
})