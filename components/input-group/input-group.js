Component({
  data: {
    inputItems: [],
    outputItems: {},
  },
  methods: {
    initOutputItems: function () {
      const outputItems = this.data.outputItems
      for (const i of this.data.inputItems) {
        outputItems[i.key] = i.value
      }
      this.setData({ 'outputItems': outputItems })
    },
    updateData: function (e) {
      this.setData({ inputItems: e })
      const els = this.selectAllComponents('.input')
      for (const i in els) {
        els[i].updateData(this.data.inputItems[i])
      }
      this.initOutputItems()
    },
    updateOutput: function (k, v) {
      let outputItems = this.data.outputItems
      outputItems[k] = v
      this.setData({ 'outputItems': outputItems })
      this.triggerEvent('input', outputItems)
    },

    onInput: function (e) {
      this.updateOutput(e.detail.key, e.detail.value)
    },
    clear: function () {
      this.selectAllComponents('.input').forEach(i => i.clear());
    }
  }
})