const util = require('../../utils/util')
const api = require('../../utils/api')
Page({
  data: {
    questions: [],
    current: 1
  },
  onLoad: function () {
    this.updateQuestion().then(() => {
      this.selectComponent('#questions').initData({ questions: this.data.questions })
    })
  },
  updateQuestion: function () {
    return api.questions({ categoryId: 1, size: 10, current: this.data.current, keyword: '', solvedFlag: 2 }).then(res => {
      this.setData({ questions: util.parseQuestionItem(res.records) })
      this.selectComponent('#pagination').initData({ total: parseInt((res.total + res.size - 1) / res.size), current: this.data.current })
      // this.updateUserAndTime()
      // this.updateQuestioniInfo()
    })
  },
})