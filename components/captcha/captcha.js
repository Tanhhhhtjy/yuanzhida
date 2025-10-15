const api = require('../../utils/api.js')
Component({
  data: {
    imageUrl: '/assets/image/captcha_none.png',
    cookie: '',
    code: '',
    timer: 0
  },
  lifetimes: {
    attached: function () {
      this.getCaptcha()
    }
  },
  methods: {
    reset: function () {
      this.getCaptcha()
    },
    onInput: function (e) {
      this.setData({ code: e.detail.value })
    },
    getCaptcha: function () {
      clearTimeout(this.data.timer)
      api.login_code().then(res => {
        this.setData({ imageUrl: res.filePath, cookie: res.cookie })
        this.setData({
          timer: setTimeout(() => {
            this.reset()
          }, 30 * 1000)
        })
      }).catch(err => {
        wx.showToast({
          title: err,
          icon: 'error'
        })
      })
    },
    onSubmit: function () {
      this.triggerEvent('submit', { 'code': this.data.code, 'cookie': this.data.cookie })
    }
  }
})