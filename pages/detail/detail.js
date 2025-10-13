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
    'subject_name': '',
    'comments': [],
    'likeCount': 0,
    likeStatus: '未登录',
    userId: 0,
    commentCount: 0,
    viewCount: 0,
    createTime: ''
  },

  onLoad(options) {
    let id = options.id
    this.setData({ 'questionId': id })
    api.questionDetail(id)
      .then(res => {
        let subjects = data.getSubjects(id)
        this.setData({ 'title': res.title, commentCount: res.commentCount, viewCount: res.viewCount, createTime: res.createTime, likeCount: res.likeCount, username: res.username, entityUserId: res.userId, 'content': res.content, likeStatus: res.likeStatus, 'images': res.images ? util.add_oss_prefix_images(res.images.split(',')) : [], 'subject_name': subjects[res.categoryId].name, userId: res.userId })
      }).catch(e => {
        wx.showToast({
          title: e,
          icon: 'error'
        })
      })

    api.comments({ 'id': id, size: 10, current: 1 })
      .then(res => {
        let records = res.records
        let newRecords = []
        for (let record of records) {
          record.images = record.images ? util.add_oss_prefix_images(record.images.split(',')) : []
          newRecords.push(record)
        }
        this.setData({ 'comments': newRecords })
      }).catch(e => {
        wx.showToast({
          title: `获取解答失败${e}`,
        })
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
    api.newAnswer(outputItems).then(() => {
      wx.hideLoading()
      wx.showToast({
        title: '提交成功',
      })
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'error'
      })
    })
  }
})