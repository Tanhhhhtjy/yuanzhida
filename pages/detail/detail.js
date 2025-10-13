const api = require('../../utils/api')
const data = require('../../utils/data')
const util = require('../../utils/util')
Page({

  data: {
    question: {},
    questionId: 0,
    CommentPageCurrent: 1,
    'inputItems': [
      { type: 'text', key: 'content', title: '内容', multiLine: true },
      { type: 'images', key: 'images' }
    ],
    'outputItems': {},
  },

  onLoad(options) {
    this.setData({ questionId: options.id })
    this.updateQuestion().then(() => {
      this.updateUserAndTime()
      this.updateQuestionInfo()
      this.updateImagesPreview()
    })
    this.updateComments()
  },
  updateImagesPreview: function () {
    this.selectComponent('#images-preview').updateData({ images: this.data.question.images })
  },
  updateUserAndTime: function () {
    this.selectComponent('#user-and-time').updateData({ username: this.data.question.username, time: this.data.question.createTime })
  },
  updateQuestionInfo: function () {
    const { solvedFlag, viewCount, commentCount, username, likeCount, userId, likeStatus } = this.data.question
    this.selectComponent('#question-info').updateData({
      solvedFlag: solvedFlag, viewCount: viewCount, commentCount: commentCount, likeCount: likeCount, entityUserId: userId, username: username, questionId: this.data.questionId, likeStatus: likeStatus
    })
  },
  updateQuestion: function () {
    return api.questionDetail(this.data.questionId)
      .then(res => {
        res.images = util.parseImages(res.images)
        res.createTime = util.parseTime(res.createTime)
        res.subject_name = data.getSubjectName(res.categoryId)
        this.setData({ question: res })
      }).catch(e => {
        wx.showToast({
          title: e,
          icon: 'error'
        })
      })
  },
  updateComments: function () {
    api.comments({ 'id': this.data.questionId, size: 10, current: this.data.CommentPageCurrent })
      .then(res => {
        this.selectComponent('#comments').updateData({ comments: util.add_oss_prefix_comments(res.records), entityUserId: this.data.question.userId })
        this.selectComponent('#pagination').updateData({ total: parseInt((res.total + res.size - 1) / res.size), current: this.data.CommentPageCurrent })
      }).catch(err => {
        console.error(err);
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
      this.selectComponent('#input-group').clear()
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'error'
      })
    })
  },
  onCommmentRedirect: function (e) {
    this.setData({ CommentPageCurrent: e.detail })
    this.updateComments()
  }
})