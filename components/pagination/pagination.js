const util = require('../../utils/util')
const interact = require('../../utils/interact')
Component({
  data: {
    current: 1,
    total: 1,
    indexList: [],
    inputItems: [
      { type: 'text', key: 'page', title: '跳转' }],
    outputItems: {}
  },
  methods: {
    initData: function (d) {
      this.setData(d)
      this.updateIndexList()
    },
    updateIndexList: function () {
      let current = this.data.current
      let total = this.data.total
      let indexList = []
      if (total <= 5) {
        indexList = util.GenerateNumList(1, total)
      } else if (total > current + 1) {
        indexList = [1, 2, current - 1, current, current + 1, total]
      } else {
        indexList = [1, 2, util.GenerateNumList(current - 1, total)]
      }
      this.setData({ indexList })
    },
    onInput: function (e) {
      this.setData({ outputItems: e.detail })
    },
    submitRedirect: function (e) {
      if (e.currentTarget.dataset['page']) {
        this.triggerEvent('redirect', e.currentTarget.dataset['page'])
        return
      }
      const page = parseInt(this.data.outputItems['page'])
      if (page <= this.data.total && page != this.data.current) {
        this.triggerEvent('redirect', page)
        this.selectComponent('#input-group').clear()
      } else {
        interact.errorToast('无法跳转')
      }
    }
  }
})