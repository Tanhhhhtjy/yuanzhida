const util = require('../../utils/util')
Component({
  data: {
    questions: []
  },
  methods: {
    initData: function (d) {
      this.setData(d)
      this.updateUserAndTime()
      this.updateQuestioniInfo()
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
    }
  }
})