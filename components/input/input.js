Component({

  properties: {
    text: { type: String, value: "标签" },
    value: { type: String, value: "内容" },
    placeholder: { type: String, value: "请输入" }
  },
  data: {

  },

  methods: {
    _onInput: function (e) {
      this.triggerEvent('input', e)
    }
  }
})