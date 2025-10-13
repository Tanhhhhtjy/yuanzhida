const api = require('../../utils/api')
const data = require('../../utils/data')
const util = require('../../utils/util')
Page({

  data: {
    question: {},
    questionId: 0,
    CommentPageCurrent: 1,
    inputItems: [
      { type: 'text', key: 'content', title: '内容', multiLine: true, value: '' },
      { type: 'images', key: 'images', value: [] }
    ],
    outputItems: {},
    isCorrect: false,
    correctId: 0
  },

  onLoad(options) {
    this.setData({ questionId: options.id })
    this.updateQuestion().then(() => {
      this.updateUserAndTime()
      this.updateQuestionInfo()
      this.updateImagesPreview()
    })
    this.updateComments()
    this.selectComponent('#input-group').updateData(this.data.inputItems)
  },
  cancelCorrect: function () {
    this.setData({ isCorrect: false })
  },
  onUpdate: function () {
    this.updateComments()
  },
  updateImagesPreview: function () {
    this.selectComponent('#images-preview').updateData({ images: this.data.question.images })
  },
  updateUserAndTime: function () {
    this.selectComponent('#user-and-time').updateData({ username: this.data.question.username, time: this.data.question.createTime })
  },
  updateQuestionInfo: function () {
    const { solvedFlag, viewCount, categoryId, commentCount, username, likeCount, userId, likeStatus } = this.data.question
    this.selectComponent('#question-info').updateData({
      solvedFlag: solvedFlag, viewCount: viewCount, commentCount: commentCount, likeCount: likeCount, entityUserId: userId, categoryId: categoryId, username: username, questionId: this.data.questionId, likeStatus: likeStatus
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
      this.updateComments()
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
  },
  onCorrectComment: function (e) {
    const { id, content, images } = e.detail
    const inputItems = this.data.inputItems
    inputItems[0].value = content
    inputItems[1].value = images
    this.setData({ isCorrect: true, inputItems: inputItems, correctId: id })
    this.selectComponent('#input-group').updateData(this.data.inputItems)
  },
  submitCorrect: function () {
    wx.showLoading({
      title: '正在提交',
    })
    api.correctComment({ id: this.data.correctId, content: this.data.outputItems.content, images: this.data.outputItems.images }).then(() => {
      wx.hideLoading()
      wx.showToast({
        title: '修改成功',
      })
      setTimeout(() => {
        this.updateComments()
        this.selectComponent('#input-group').clear()
      }, 1500);
    }).catch(err => {
      wx.hideLoading()
      wx.showToast({
        title: err,
        icon: 'error'
      })
    })
  },
  onCorrentQuestion: function () {
    wx.setStorageSync('correctQuestion', this.data.question)
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/newQuestion/newQuestion',
      })
    }, 1500);
  }
})