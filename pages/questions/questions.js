const api = require('../../utils/api')
const data = require('../../utils/data')
const util = require('../../utils/util')
Page({

  data: {
    'subject_image': '',
    'questions': [],
    'categoryId': 1
  },
  onLoad(options) {
    let id = options.id
    this.setData({ 'categoryId': id, 'subject_image': data.getSubjectImage(id) })
    this.getQuestion()

  },
  getQuestion: function () {
    api.questions({ 'categoryId': this.data.categoryId, size: 10, current: 1, keyword: '', solvedFlag: 2 }).then(res => {
      console.log(res);
      this.setData({ 'questions': util.shortQuestionContent(res.records) })
    })
  }

})