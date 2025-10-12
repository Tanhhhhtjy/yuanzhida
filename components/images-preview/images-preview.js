Component({
  properties: {
    images: { type: Array, value: [] },
    height: { type: String, value: '300rpx' }
  },
  methods: {
    previewImage: function (e) {
      wx.previewImage({
        urls: this.data.images,
        current: this.data.images[e.currentTarget.dataset['index']]
      })
    },
  }
})