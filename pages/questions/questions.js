const api = require('../../utils/api')
const data = require('../../utils/data')
const util = require('../../utils/util')
Page({

  data: {
    'subject_image': '',
    'questions': [],
    'categoryId': 1,
    'current': 1,
    'pageTotal': 1,
    'pageNow': 1
  },
  onLoad(options) {
    console.log(options);
    console.log('/pages/questions/questions?current='+this.data.current+'&categoryId='+this.data.categoryId);
    let page = options.current || 1
    let categoryId = options.categoryId
    this.setData({ 'categoryId': categoryId, 'page': page, 'subject_image': data.getSubjectImage(categoryId) })
    this.getQuestion()
  },
  getQuestion: function () {
    api.questions({ 'categoryId': this.data.categoryId, size: 10, current: this.data.page, keyword: '', solvedFlag: 2 }).then(res => {
      let itemTotal = res.total
      let itemSize = res.size
      let pageNow = res.current
      let pageTotal = parseInt((itemTotal + itemSize - 1) / itemSize)
      this.setData({ 'questions': util.shortQuestionContent(res.records), 'pageTotal': pageTotal, 'pageNow': pageNow })
      
    })
  }

})