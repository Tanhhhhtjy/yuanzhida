const util = require('../../utils/util')
Component({
  data: {
    images: []
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
  }
})