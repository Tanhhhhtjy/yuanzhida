Component({
  data: {
    key: 'key',
    title: '标签',
    value: '',
    placeholder: '请输入',
    multiLine: false,
    password: false
  },
  methods: {
    _onInput: function (e) {
      this.setData({ value: e.detail.value.trim() })
      this.trigger()
    },
    trigger: function () {
      this.triggerEvent('input', { 'key': this.data.key, 'value': this.data.value })
    },
    clear: function () {
      this.setData({ value: '' })
    },
    updateData: function (d) {
      this.setData(d)
    }
  }
})