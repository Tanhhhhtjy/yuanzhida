const util = require('../../utils/util')
Component({
  data: {
    comments: [],
    entityUserId: 0
  },
  methods: {
    updateData: function (d) {
      this.setData(d)
      this.updateUserAndTime()
      this.updateCommentInfo()
    },
    updateUserAndTime: function () {
      const els = this.selectAllComponents('.user-and-time')
      for (let i in els) {
        els[i].updateData({ username: this.data.comments[i].username, time: util.parseTime(this.data.comments[i].createTime) })
      }
    },
    updateCommentInfo: function () {
      const els = this.selectAllComponents('.comment-info')
      for (let i in els) {
        const { likeCount, likeStatus, id, useful } = this.data.comments[i]
        els[i].updateData({
          likeStatus: likeStatus, likeCount: likeCount, entityUserId: this.data.entityUserId, commentId: id, useful: useful
        })
      }
    }
  }
})