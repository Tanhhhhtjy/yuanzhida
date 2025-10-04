const data = require('../../utils/data')
const util = require('../../utils/util')
Page({

  data: {
    subjects: []
  },

  onLoad() {
    let subjects = data.getSubjects()
    this.setData({ 'subjects': subjects })
  },
})