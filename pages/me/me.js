const auth = require('../../utils/auth')
Page({


  data: {
    username: ''
  },

  onLoad() {
    this.setData({ 'username': auth.getUsername() })
  },

  logout: function () {
    wx.showModal({
      title: '警告',
      content: '是否退出登录',
      complete: (res) => {
        if (res.confirm) {
          auth.logout()
          wx.showToast({
            title: '退出登录成功',
          })
          setTimeout(() => {
            this.setData({ 'username': auth.getUsername() })
          }, 2000);
        }
      }
    })
  }

})