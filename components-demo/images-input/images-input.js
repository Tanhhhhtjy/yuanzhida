Page({
  onLoad() {
    this.selectComponent('#images-input').initData({ value: ['2025/10/04/be47a786-4f79-4b46-99df-2042ccf6db42.png'], maxNum: 3 })
  },
  onInput: function (e) {
    console.log(e.detail);
  }
})