Component({

  properties: {
    key: { type: String, value: 'key' },
    text: { type: String, value: "标签" },
    value: { type: String, value: "" },
    placeholder: { type: String, value: "请输入" },
    multiLine: { type: Boolean, value: false },
    password: { type: Boolean, value: false }
  },
  data: {
    newValue: ''
  },

  methods: {
    _onInput: function (e) {
      this.setData({ newValue: e.detail.value.trim() })
      this.trigger()
    },
    trigger: function () {
      this.triggerEvent('input', { 'key': this.data.key, 'value': this.data.newValue })
    },
    clear: function () {
      this.setData({ newValue: '' })
    },
    updateData: function (s) {
      this.setData({ newValue: s })
      this.trigger()
    }
  },
  lifetimes: {
    attached: function () {
      this.setData({ newValue: this.data.value })
      this.trigger()
    }
  }
})