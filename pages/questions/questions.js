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
      this.selectComponent('#questions').initData({ questions: util.parseQuestionItem(res.records) })
      this.selectComponent('#pagination').initData({ total: parseInt((res.total + res.size - 1) / res.size), current: this.data.current })
    })
  },
  onRedirect: function (e) {
    // e.detail : 2
    this.setData({ current: e.detail })
    this.updateQuestion()
  }
})