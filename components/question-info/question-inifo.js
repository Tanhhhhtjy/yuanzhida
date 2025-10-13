const api = require('../../utils/api')
Component({
  data: {
    solvedFlag: false,
    viewCount: 0,
    commentCount: 0,
    likeCount: 0,
    entityUserId: 0,
    questionId: 0,
    likeStatus: '未登录'
  },
  methods: {
    updateData: function (d) {
      this.setData(d)
    },
    likeQuestion: function () {
      if (this.data.likeStatus == '未登录') {
        wx.showToast({
          title: '未登录',
          icon: 'error'
        })
        return
      }
      api.likeQuestion(this.data.questionId, this.data.entityUserId).then(() => {
        if (this.data.likeStatus == '未点赞') {
          wx.showToast({
            title: '点赞成功',
          })
          this.setData({ likeStatus: '已点赞', likeCount: this.data.likeCount + 1 })
        } else {
          wx.showToast({
            title: '取消点赞',
          })
          this.setData({ likeStatus: '未点赞', likeCount: this.data.likeCount - 1 })
        }
      }).catch(err => {
        wx.showToast({
          title: err,
          icon: 'error'
        })
      })
    }
  }
})