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
    keyword: '',
    solvedFlag: 2,
  },
  onLoad(options) {
    const categoryId = options.categoryId
    this.setData({ categoryId, subject_image: data.getSubjectImage(categoryId) })
    this.updateQuestion()
  },
  onSubmitKeyword: function (e) {
    // e.detail : 'hello'
    this.setData(e.detail)
    this.updateQuestion()
  },
  updateQuestion: function () {
    api.questions({ categoryId: this.data.categoryId, size: 10, current: this.data.current, keyword: this.data.keyword, solvedFlag: this.data.solvedFlag }).then(res => {
      this.setData({ questions: util.parseQuestionItem(res.records) })
      this.selectComponent('#pagination').initData({ total: parseInt((res.total + res.size - 1) / res.size), current: this.data.current })
      this.updateUserAndTime()
      this.updateQuestioniInfo()
    })
  },
  updateUserAndTime: function () {
    const els = this.selectAllComponents('.user-and-time')
    for (let i in els) {
      els[i].initData({ username: this.data.questions[i].username || '用户名', time: util.parseTime(this.data.questions[i].createTime) })
    }
  },
  updateQuestioniInfo: function () {
    const els = this.selectAllComponents('.question-info')
    for (let i in els) {
      const { solvedFlag, viewCount, commentCount, likeCount, id } = this.data.questions[i]
      els[i].initData({ solvedFlag, viewCount, commentCount, likeCount, id })
    }
  },
  onRedirect: function (e) {
    // e.detail : 2
    this.setData({ current: e.detail })
    this.updateQuestion()
  }
})