const api = require('../../utils/api')
const data = require('../../utils/data')
Component({
  data: {
    likeStatus: '',
    likeCount: 0,
    entityUserId: 0,
    commentId: 0,
    useful: 0,
    isOwn: false,
    username: ''
  },
  methods: {
    correntComment: function () {
      this.triggerEvent('correntComment')
    },
    deleteComment: function () {
      api.deleteComment(this.data.commentId).then(() => {
        wx.showToast({
          title: '删除成功',
        })
        this.triggerEvent('update')
      }).catch(err => {
        wx.showToast({
          title: err,
          icon: 'error'
        })
      })
    },
    updateData: function (d) {
      this.setData(d)
      this.setData({ isOwn: data.isOwn(this.data.username) })
    },
    flagUseful: function () {
      api.flagUseful(this.data.commentId).then(() => {
        let text = '已取消标记'
        if (this.data.useful) text = '已标记有用'
        wx.showToast({
          title: text,
        })
        this.setData({ useful: !this.data.useful })
      }).catch(err => {
        wx.showToast({
          title: err,
          icon: 'error'
        })
      })
    },
    likeComment: function () {
      if (this.data.likeStatus == '未登录') {
        wx.showToast({
          title: '未登录',
          icon: 'error'
        })
        return
      }
      api.likeComment(this.data.commentId, this.data.entityUserId).then(res => {
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