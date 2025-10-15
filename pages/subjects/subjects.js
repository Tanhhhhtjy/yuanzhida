const data = require('../../utils/data')
const util = require('../../utils/util')
const api = require('../../utils/api')
const interact = require('../../utils/interact')
Page({
  data: {
    subjects: []
  },
  onLoad() {
    let subjects = data.getSubjects()
    if (subjects.length > 0) {
      this.setData({ subjects: subjects })
    } else {
      // if get the data from localStorage fail
      api.subjects().then(res => {
        subjects = util.toVisibleItemList(res.sort((a, b) => a.id - b.id))
        this.setData({ subjects: subjects })
      }).catch(interact.errorToast)
    }
  },
})