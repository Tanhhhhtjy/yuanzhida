const data = require('../../utils/data')
const util = require('../../utils/util')
const api = require('../../utils/api')
Page({

  data: {
    subjects: []
  },

  onLoad() {
    let subjects = data.getSubjects()
    if (subjects.length > 0) {
      this.setData({ 'subjects': subjects })
    } else {
      api.subjects().then(res => {
        subjects = util.add_oss_prefix_subjects(res)
        this.setData({ 'subjects': subjects })
      }).catch(err => {
        wx.showToast({
          title: err,
          icon: 'error'
        })
      })
    }
  },
})