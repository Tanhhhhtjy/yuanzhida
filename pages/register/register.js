const api = require('../../utils/api')
Page({
  data: {
    outputItems: {},
    captchaText: "获取邮箱验证码"
  },
  onLoad: function () {
    this.selectComponent('#input-group').initData({
      inputItems: [
        { type: "text", key: "username", label: "用户名" },
        { type: "text", key: "password", label: "密码", password: true },
        { type: "text", key: "mail", label: "邮箱" },
        { type: "text", key: "code", label: "验证码" },
      ]
    })
  },
  getCode: function () {
    wx.showLoading({
      title: '正在发送验证码',
    })
    api.register_code({ mail: this.data.outputItems.mail }).then(() => {
      wx.hideLoading()
      wx.showToast({
        title: '验证码发送成功',
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
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
      }, 1500);
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'error'
      })
    })
  },
  onInput: function (e) {
    this.setData({ 'outputItems': e.detail })
  }
})