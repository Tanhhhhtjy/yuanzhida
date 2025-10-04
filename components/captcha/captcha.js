const api = require('../../utils/api.js')
Component({
  properties: {
  },
  data: {
    'image_url': '/assets/image/captcha.png',
    'reset_text': '重置',
    'button_disabled': true,
    'cookie': '',
    'code': ''
  },
  ready: function () {
    this.get_captcha()
  },
  methods: {
    reset: function () {
      this.get_captcha()
    },
    onInput: function (e) {
      let temp = {}
      temp[e.currentTarget.dataset.label] = e.detail.detail.value
      this.setData(temp)
    },
    get_captcha: function () {
      api.login_code().then(res => {
        this.setData({ 'image_url': res.filePath, 'cookie': res.cookie })
      }).catch(err => {
        console.log(err)
      })
    },
    onSubmit: function () {
      this.triggerEvent('submit', { 'code': this.data.code, 'cookie': this.data.cookie })
    }
  }
})