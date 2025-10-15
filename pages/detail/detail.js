const api = require('../../utils/api')
const data = require('../../utils/data')
const util = require('../../utils/util')
const interact = require('../../utils/interact')
Page({
  data: {
    question: {},
    questionId: 0,
    CommentPageCurrent: 1,
    outputItems: {},
    // if correct comment
    isCorrect: false,
    correctCommentId: 0,
    inputItems: [
      { type: 'text', key: 'content', label: '内容', multiLine: true },
      { type: 'images' }
    ]
  },

  onLoad(options) {
    this.setData({ questionId: options.id })
    this.updateQuestion().then(() => {
      this.updateUserAndTime()
      this.updateQuestionInfo()
      this.updateImagesPreview()
      this.updateComments()
    })
    this.selectComponent('#input-group').initData({ inputItems: this.data.inputItems })
  },
  cancelCorrect: function () {
    this.setData({ isCorrect: false })
  },
  onUpdate: function () {
    // when update comments' status,reflesh the comments from the api
    this.updateComments()
  },
  updateImagesPreview: function () {
    this.selectComponent('#images-preview').initData({ images: this.data.question.images })
  },
  updateUserAndTime: function () {
    this.selectComponent('#user-and-time').initData({ username: this.data.question.username, time: this.data.question.createTime })
  },
  updateQuestionInfo: function () {
    const { solvedFlag, viewCount, categoryId, commentCount, username, likeCount, userId, likeStatus } = this.data.question
    this.selectComponent('#question-info').initData({
      solvedFlag, viewCount, commentCount, likeCount, entityUserId: userId, categoryId, username, questionId: this.data.questionId, likeStatus
    })
  },
  updateQuestion: function () {
    return api.questionDetail(this.data.questionId).then(res => {
      res = util.modifyItem(res)
      res.subject_name = data.getSubjectName(res.categoryId)
      this.setData({ question: res })
    }).catch(interact.errorToast)
  },
  updateComments: function () {
    api.comments({ id: this.data.questionId, size: 10, current: this.data.CommentPageCurrent }).then(res => {
      this.selectComponent('#comments').initData({ comments: util.modifyItemList(res.records), entityUserId: this.data.question.userId, questionUsername: this.data.question.username })
      this.selectComponent('#pagination').initData({ total: parseInt((res.total + res.size - 1) / res.size), current: this.data.CommentPageCurrent })
    }).catch(interact.errorToast)
  },
  onInput: function (e) {
    this.setData({ outputItems: e.detail })
  },
  submit_answer: function () {
    let outputItems = this.data.outputItems
    outputItems['questionId'] = this.data.questionId
    outputItems['topCommentId'] = 0
    outputItems['parentCommentId'] = 0
    wx.showLoading({ title: '正在提交', })
    api.newAnswer(outputItems).then(() => {
      wx.hideLoading()
      wx.showToast({ title: '提交成功', })
      this.selectComponent('#input-group').clear()
      this.updateComments()
    }).catch(interact.errorToast)
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
    this.setData({ isCorrect: true, inputItems: inputItems, correctCommentId: id })
    this.selectComponent('#input-group').initData({ inputItems: this.data.inputItems })
  },
  submitCorrect: function () {
    wx.showLoading({
      title: '正在提交',
    })
    api.correctComment({ id: this.data.correctCommentId, content: this.data.outputItems.content, images: this.data.outputItems.images }).then(() => {
      wx.hideLoading()
      wx.showToast({ title: '修改成功', })
      setTimeout(() => {
        this.updateComments()
        this.selectComponent('#input-group').clear()
      }, 1500);
    }).catch(err => {
      wx.hideLoading()
      interact.errorToast(err)
    })
  },
  onCorrentQuestion: function () {
    const { title, content, categoryId, images, id } = this.data.question
    wx.setStorageSync('cachedQuestion', { title, content, categoryId, id, images })
    setTimeout(() => {
      wx.reLaunch({ url: '/pages/newQuestion/newQuestion', })
    }, 1500);
  }
})