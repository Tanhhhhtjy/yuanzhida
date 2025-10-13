Component({
  data: {
    images: []
  },
  methods: {
    updateData: function (d) {
      this.setData(d)
    },
    previewImage: function (e) {
      wx.previewImage({
        urls: this.data.images,
        current: this.data.images[e.currentTarget.dataset['index']]
      })
    },
  }
})