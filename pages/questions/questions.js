const api = require('../../utils/api')
const data = require('../../utils/data')
const util = require('../../utils/util')
Page({
  data: {
    // below is the normal questions list
    keyword: '',
    solvedFlag: 2,
    subject_image: '',
    categoryId: 1,
    // below is the all pages have
    pageType: 0,
    title: '',
    current: 1,
    pageTotal: 1,
    questions: [],
  },
  onLoad(options) {
    // the normal questions page
    if (options.categoryId) {
      const categoryId = options.categoryId
      this.setData({ categoryId, subject_image: data.getSubjectImage(categoryId) })
    } else {
      // the personal footprint
      this.setData({ pageType: options.pageType })
      const text = ['游览记录', '我的题目', '收藏列表'][options.pageType-1]
      this.setData({ title: text })
    }
    this.updateQuestion()
  },
  onSubmitKeyword: function (e) {
    // e.detail : 'hello'
    this.setData(e.detail)
    this.updateQuestion()
  },
  updateQuestion: function () {
    let apiPromise
    const specialParams = { size: 10, current: this.data.current }
    const pageType = this.data.pageType
    if (pageType == 1) {
      apiPromise = api.historyQuestions(specialParams)
    } else if (pageType == 2) {
      apiPromise = api.myQuestions(specialParams)
    } else if (pageType == 3) {
      apiPromise = api.collectedQuestions(specialParams)
    } else {
      apiPromise = api.questions({ categoryId: this.data.categoryId, size: 10, current: this.data.current, keyword: this.data.keyword, solvedFlag: this.data.solvedFlag })
    }
    apiPromise.then(res => {
      this.selectComponent('#questions').initData({ questions: util.parseQuestions(res.records) })
      this.selectComponent('#pagination').initData({ total: parseInt((res.total + res.size - 1) / res.size), current: this.data.current })
    })
  },
  onRedirect: function (e) {
    // e.detail : 2
    this.setData({ current: e.detail })
    this.updateQuestion()
  }
})