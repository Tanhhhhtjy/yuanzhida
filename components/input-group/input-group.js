Component({
  properties: {
    inputItems: { type: Array, value: [] }
  },

  data: {
    outputItems: {},
  },

  methods: {
    updateOutput: function (k, v) {
      let outputItems = this.data.outputItems
      outputItems[k] = v
      this.setData({ 'outputItems': outputItems })
      this.triggerEvent('input', outputItems)
    },

    onInput: function (e) {
      this.updateOutput(e.detail.key, e.detail.value)
    }
  }
})