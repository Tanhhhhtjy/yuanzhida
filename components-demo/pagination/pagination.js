Page({
  onLoad: function () {
    this.selectComponent('#pagination').initData({ current: 1, total: 2 })
  }
})