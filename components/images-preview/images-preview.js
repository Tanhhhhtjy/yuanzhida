const util = require('../../utils/util')
Component({
  data: {
    images: []
  },
  methods: {
    initData: function (d) {
      d.images = util.add_oss_prefix_images(d.images)
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