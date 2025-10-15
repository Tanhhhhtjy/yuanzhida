Page({
  onLoad: function () {
    this.selectComponent('#subjects-selector').initData({ value: 1 })
  },
  onInput: function (e) {
    console.log(e.detail);
  }
})