const api = require('../../utils/api')
const data = require('../../utils/data')
const util = require('../../utils/util')
Page({

  data: {
    subject_image: '',
    questions: [],
    categoryId: 1,
    current: 1,
    pageTotal: 1,
  },
  onLoad(options) {
    let current = options.current || 1
    const categoryId = options.categoryId
    this.setData({ 'categoryId': categoryId, 'current': current, 'subject_image': data.getSubjectImage(categoryId) })
    this.updateQuestion()
  },
  updateQuestion: function () {
    api.questions({ 'categoryId': this.data.categoryId, size: 10, current: this.data.current, keyword: '', solvedFlag: 2 }).then(res => {
      this.setData({ questions: util.parseQuestionItem(res.records) })
      this.selectComponent('#pagination').updateData({ total: parseInt((res.total + res.size - 1) / res.size), current: this.data.current })
      this.updateUserAndTime()
      this.updateQuestioniInfo()
    })
  },
  updateUserAndTime: function () {
    const els = this.selectAllComponents('.user-and-time')
    for (let i in els) {
      els[i].updateData({ username: this.data.questions[i].username || '用户名', time: util.parseTime(this.data.questions[i].createTime) })
    }
  },
  updateQuestioniInfo: function () {
    const els = this.selectAllComponents('.question-info')
    for (let i in els) {
      const { solvedFlag, viewCount, commentCount, likeCount, id } = this.data.questions[i]
      els[i].updateData({
        solvedFlag: solvedFlag, viewCount: viewCount, commentCount: commentCount, likeCount: likeCount, questionId: id
      })
    }
  },
  onRedirect: function (e) {
    this.setData({ current: e.detail })
    this.updateQuestion()
  }
})