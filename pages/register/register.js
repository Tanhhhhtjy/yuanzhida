const api = require('../../utils/api')
Page({
  data: {
    inputItems: [
      { type: "text", key: "username", title: "用户名" },
      { type: "text", key: "password", title: "密码", password: true },
      { type: "text", key: "mail", title: "邮箱" },
      { type: "text", key: "code", title: "验证码" },
    ],
    outputItems: {},
    captchaText: "获取邮箱验证码"
  },
  get_code: function () {
    wx.showLoading({
      title: '正在发送验证码',
    })
    api.register_code(this.data.outputItems['mail']).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '验证码发送成功',
      })
    }).catch(e => {
      wx.hideLoading()
      wx.showToast({
        title: e,
        icon: 'error'
      })
    })
  },
  submit: function () {
    wx.showLoading({
      title: '正在注册',
    })
    api.register(this.data.outputItems).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '注册成功，请登录',
      })
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/me/me',
        })
      }, 2000);
    }).catch(e => {
      wx.hideLoading()
      wx.showToast({
        title: e,
        icon: 'error'
      })
    })
  },
  onInput: function (e) {
    this.setData({ 'outputItems': e.detail })
  }
})