const util = require('../../utils/util')
Component({
  properties: {
    'now': { value: 1, type: Number },
    'total': { value: 100, type: Number }
  },

  data: {
    indexList: [],
    inputItems: [
      { type: 'text', key: 'page', title: '跳转' }],
    outputItems: {}
  },
  observers: {
    'total': function () {
      this.updateIndexList()
    }
  },
  methods: {
    updateIndexList: function () {
      let now = this.data.now
      let total = this.data.total
      let indexList = []
      if (total <= 5) {
        indexList = util.GenerateNumList(1, total)
      } else if (total > now + 1) {
        indexList = [1, 2, now - 1, now, now + 1, total]
      } else {
        indexList = [1, 2, util.GenerateNumList(now - 1, total)]
      }
      this.setData({ 'indexList': indexList })
    },
    onInput: function (e) {
      this.setData({ 'outputItems': e.detail })
    },
    submitRedirect: function (e) {
      let page = e.currentTarget.dataset['page'] || parseInt(this.data.outputItems['page'])
      if (page <= this.data.total && page != this.data.now) {
        this.triggerEvent('redirect', page)
      } else {
        wx.showToast({
          title: '无法跳转',
          icon: 'error'
        })
      }
    }
  },
  lifetimes: {
    attached: function () {
      this.updateIndexList()
    }
  }
})