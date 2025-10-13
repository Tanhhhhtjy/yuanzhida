const api = require('../../utils/api')
Component({

  properties: {
    solvedFlag: { type: Boolean, value: false },
    viewCount: { type: Number, value: 0 },
    commentCount: { type: Number, value: 0 },
    likeCount: { type: Number, value: 0 },
    canDo: { type: Boolean, value: false },
    entityUserId: { type: Number, value: 0 },
    questionId: { type: Number, value: 0 },
    likeStatus: { type: String, value: '未登录' }
  },
  data: {
    _likeStatus: '',
    _likeCount: 0
  },
  lifetimes: {
    attached: function () {
      this.updateLikeStatus()
    }
  },
  observers: {
    'likeStatus,likeCount': function () {
      this.updateLikeStatus()
    }
  },
  methods: {
    updateLikeStatus: function () {
      this.setData({ _likeStatus: this.data.likeStatus, _likeCount: this.data.likeCount })
    },
    likeQuestion: function () {
      if (this.data._likeStatus == '未登录') {
        wx.showToast({
          title: '未登录',
          icon: 'error'
        })
        return
      }
      api.likeQuestion(this.data.questionId, this.data.entityUserId).then(() => {
        if (this.data._likeStatus == '未点赞') {
          wx.showToast({
            title: '点赞成功',
          })
          this.setData({ _likeStatus: '已点赞', _likeCount: this.data._likeCount + 1 })
        } else {
          wx.showToast({
            title: '取消点赞',
          })
          this.setData({ _likeStatus: '未点赞', _likeCount: this.data._likeCount - 1 })
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