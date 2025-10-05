const api = require('../../utils/api.js')
Component({
  properties: {
  },
  data: {
    'image_url': '/assets/image/captcha_none.png',
    'reset_text': '重置',
    'button_disabled': false,
    'cookie': '',
    'code': '',
    'timer': 0
  },
  ready: function () {
    this.get_captcha()
  },
  methods: {
    reset: function () {
      this.get_captcha()
    },
    onInput: function (e) {
      this.setData({ 'code': e.detail.value })
    },
    get_captcha: function () {
      clearTimeout(this.data.timer)
      api.login_code().then(res => {
        this.setData({ 'image_url': res.filePath, 'cookie': res.cookie })
        this.setData({
          'timer': setTimeout(() => {
            this.reset()
          }, 30 * 1000)
        })
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit: function () {
      this.triggerEvent('submit', { 'code': this.data.code, 'cookie': this.data.cookie })
    }
  }
})