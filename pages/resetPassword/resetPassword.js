var api = require('../../utils/api.js')
Page({
  data: {
    outputItems: {},
    codeButtonText: '获取验证码',
    codeButtonDisabled: false,
    countdownTime: 0,
    isLoading: false
  },
  onLoad: function () {
    this.selectComponent('#input-group').initData({
      inputItems: [
        { type: 'text', key: 'username', label: '用户名' },
        { type: 'text', key: 'mail', label: '邮箱' },
        { type: 'text', key: 'code', label: '验证码' },
        { type: 'text', key: 'newPassword', label: '新密码', password: true },
        { type: 'text', key: 'confirmPassword', label: '确认密码', password: true }
      ]
    })
  },
  onInput: function (e) {
    this.setData({ outputItems: e.detail })
  },
  // 获取验证码
  onGetCode: function () {
    const { username, mail } = this.data.outputItems

    // 表单验证
    if (!username) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'error'
      })
      return
    }

    if (!mail) {
      wx.showToast({
        title: '请输入邮箱',
        icon: 'error'
      })
      return
    }

    // 简单的邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(mail)) {
      wx.showToast({
        title: '请输入有效的邮箱',
        icon: 'error'
      })
      return
    }

    this.setData({ isLoading: true })

    api.sendResetPasswordCode({ mail }).then(res => {
      wx.showToast({
        title: '验证码已发送到邮箱'
      })

      // 开始倒计时
      this.startCountdown()
    }).catch(err => {
      wx.showToast({
        title: err || '获取验证码失败',
        icon: 'error'
      })
      this.setData({ isLoading: false })
    })
  },

  // 倒计时逻辑
  startCountdown: function () {
    let countdownTime = 60
    this.setData({
      codeButtonDisabled: true,
      countdownTime: countdownTime,
      isLoading: false
    })

    const countdownInterval = setInterval(() => {
      countdownTime--
      this.setData({
        countdownTime: countdownTime,
        codeButtonText: countdownTime + 's'
      })

      if (countdownTime <= 0) {
        clearInterval(countdownInterval)
        this.setData({
          codeButtonDisabled: false,
          codeButtonText: '获取验证码',
          countdownTime: 0
        })
      }
    }, 1000)
  },

  // 重置密码
  onResetPassword: function () {
    const { username, code, newPassword, confirmPassword } = this.data.outputItems

    // 表单验证
    if (!username || !code || !newPassword || !confirmPassword) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'error'
      })
      return
    }

    if (newPassword !== confirmPassword) {
      wx.showToast({
        title: '两次输入的密码不一致',
        icon: 'error'
      })
      return
    }

    if (newPassword.length < 6) {
      wx.showToast({
        title: '密码长度至少6位',
        icon: 'error'
      })
      return
    }

    this.setData({ isLoading: true })

    api.resetPassword({ username, code, newPassword }).then(res => {
      wx.showToast({
        title: '重置密码成功',
        duration: 1500
      })

      setTimeout(() => {
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }, 1500)
    }).catch(err => {
      wx.showToast({
        title: err || '重置密码失败',
        icon: 'error'
      })
      this.setData({ isLoading: false })
    })
  }
})