Component({
  data: {
    images: [],
    canDel: false
  },
  methods: {
    initData: function (d) {
      // d: { images: ["https://oss.com/..." ,"http://tmp/...","wxfile://tmp"]
      this.setData(d)
    },
    previewImage: function (e) {
      wx.previewImage({
        urls: this.data.images,
        current: this.data.images[e.currentTarget.dataset['index']]
      })
    },
    delImage: function (e) {
      this.triggerEvent('delImage', { index: e.currentTarget.dataset.index })
    }
  }
})