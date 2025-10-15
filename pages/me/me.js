const auth = require('../../utils/auth')
const interact = require('../../utils/interact')
Page({
  data: {
    username: ''
  },
  onLoad() {
    this.setData({ username: auth.getUsername() })
  },
  logout: function () {
    interact.warnModal('退出登录', () => {
      auth.logout()
      wx.showToast({ title: '退出登录成功', })
      setTimeout(() => {
        this.setData({ username: '' })
      }, 2000);
    })
  }
})