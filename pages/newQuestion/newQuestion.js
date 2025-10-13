const api = require('../../utils/api')
Page({
  data: {
    inputItems: [
      { 'type': 'text', 'key': 'title', 'title': '标题' },
      { type: 'subject' },
      { type: 'text', key: 'content', title: '内容', multiLine: true },
      { type: 'images', key: 'images' }],
    outputItems: {}
  },
  onInput: function (e) {
    this.setData({ 'outputItems': e.detail })
  },
  onClear:function () {
    this.selectComponent('#input-group').clear()
  },
  onSubmit: function () {
    wx.showLoading({
      title: '正在请求',
    })
    api.newQuestion(this.data.outputItems)
      .then(() => {
        wx.hideLoading()
        wx.showToast({
          title: '新建问题成功',
        })
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/questions/questions?categoryId=' + this.data.outputItems['categoryId'],
          })
        }, 1000);
      })
      .catch(e => {
        wx.hideLoading()
        console.error('新建问题失败\n', e);
        wx.showModal({
          title: '新建问题失败',
          content: e
        })
      })
  }
})