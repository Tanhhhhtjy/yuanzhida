Page({
  onLoad: function () {
    this.selectComponent('#input-group').initData({
      inputItems: [
        { type: 'text', key: 'name', label: '标题' },
        { type: 'images' }
      ]
    })
  },
  onInput: function (e) {
    console.log(e.detail);
  }
})