var api = require('../../utils/api.js')
var auth = require('../../utils/auth.js')
Page({
  data: {
    'username': '',
    'password': '',
    'code': '',
    'cookie': '',
    'captcha_show': false,
    'toptipText': ''
  },
  onSubmit: function () {
    this.setData({ 'captcha_show': true })
  },
  onInput: function (e) {
    let temp = {}
    temp[e.currentTarget.dataset.label] = e.detail.detail.value
    this.setData(temp)
  },
  submit_login: function (e) {
    api.login(this.data.username, this.data.password, e.detail.code, e.detail.cookie).then(res => {
      auth.saveAuth(this.data.username, res)
      wx.reLaunch({
        url: '/pages/subjects/subjects',
      })
    }).catch(e => {
      console.log(e);
    })
  },
  captcha_hide: function () {
    this.setData({ 'captcha_show': false })
  }
})