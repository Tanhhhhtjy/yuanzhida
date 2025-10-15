const api = require('../../utils/api')
Page({
  data: {
    outputItems: {},
    isCorrect: false,
    correctedQuestionId: 0
  },
  onLoad: function () {
    // const cacheQ = wx.getStorageSync('cachedQuestion')
    // if (cacheQ) {
    //   const inputItems = this.data.inputItems
    //   inputItems[0].value = cacheQ.title
    //   inputItems[1].value = cacheQ.categoryId
    //   inputItems[2].value = cacheQ.content
    //   inputItems[3].value = cacheQ.images
    //   this.setData({ inputItems: inputItems })
    //   if (cacheQ.id) {
    //     this.setData({ isCorrect: true, correctedQuestionId: cacheQ.id })
    //   }
    // }
    this.selectComponent('#input-group').initData({
      inputItems: [
        { type: 'text', key: 'title', label: '标题', value: '' },
        { type: 'subject' },
        { type: 'text', key: 'content', label: '内容', multiLine: true, value: '' },
        { type: 'images', key: 'images', value: [] }]
    })
  },
  onInput: function (e) {
    this.setData({ 'outputItems': e.detail })
  },
  onClear: function () {
    this.selectComponent('#input-group').clear()
  },
  submitCorrect: function () {
    const { title, content, images } = this.data.outputItems
    api.correctQuestion({ title, content, images, id: this.data.correctedQuestionId }).then(res => {
      wx.showToast({
        title: '修改成功',
      })
      this.onClear()
      setTimeout(() => {
        wx.reLaunch({
          url: '/pages/questions/questions?categoryId=' + this.data.inputItems.categoryId,
        })
      }, 1500);
    }).catch(err => {
      wx.showToast({
        title: err,
        icon: 'error'
      })
    })
  },
  cancelCorrect: function () {
    wx.removeStorageSync('cachedQuestion')
    wx.reLaunch({
      url: '/pages/questions/questions?categoryId=' + this.data.outputItems.categoryId,
    })
  },
  onSubmitNewQuestion: function () {
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
      .catch(err => {
        wx.hideLoading()
        wx.showToast({
          title: err,
          icon: 'error'
        })
      })
  }
})