const api = require('../../utils/api')
Page({
  data: {
    inputItems: [
      { type: 'text', key: 'title', title: '标题' },
      { type: 'subject' },
      { type: 'text', key: 'content', title: '内容', multiLine: true },
      { type: 'images', key: 'images' }],
    outputItems: {}
  },
  onInput: function (e) {
    this.setData({ 'outputItems': e.detail })
  },
  onSubmit: function () {
    api.newQuestion(this.data.outputItems)
    .then(res => { console.log(res); })
  }
})