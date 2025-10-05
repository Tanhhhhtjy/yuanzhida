const api = require('../../utils/api')
const data = require('../../utils/data')
const util = require('../../utils/util')
Page({

  data: {
    'questionId': 0,
    'inputItems': [
      { type: 'text', key: 'content', title: '内容', multiLine: true },
      { type: 'images', key: 'images' }
    ],
    'outputItems': {},
    'title': '',
    'content': '',
    'images': [],
    'subject_name': ''
  },

  onLoad(options) {
    let id = options.id
    this.setData({ 'questionId': id })
    api.questionDetail(id)
      .then(res => {
        let subjects = data.getSubjects(id)
        this.setData({ 'title': res.title, 'content': res.content, 'images': util.add_oss_prefix_images(res.images.split(',')), 'subject_name': subjects[res.categoryId].name })
      }).catch(e => {
        wx.showToast({
          title: e,
          icon: 'error'
        })
      })

    api.comments({ 'questionId': id, size: 10, current: 1 })
      .then(res => {
        console.log(res);
      }).catch(e => {
        console.error(e);
      })
  },
  onInput: function (e) {
    this.setData({ 'outputItems': e.detail })
  },
  submit_answer: function () {
    let outputItems = this.data.outputItems
    outputItems['questionId'] = this.data.questionId
    outputItems['topCommentId'] = 0
    outputItems['parentCommentId'] = 0
    wx.showLoading({
      title: '正在提交',
    })
    api.newAnswer(outputItems).then(res => {
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
      })
      setTimeout(() => {
        wx.redirectTo('/pages/detail/detail?id=' + this.data.questionId)
      }, 2000);
    })
  }
})