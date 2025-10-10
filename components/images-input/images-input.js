Component({

  properties: {
    'initImages': { type: Array, value: [] }
  },
  data: {
    'images': [],
    'canAddImage': true,
    'addImageText': '添加图片'
  },
  lifetimes: {
    attached: function () {
      this.setData({ 'images': this.data.initImages })
      this.trigger()
    }
  },
  methods: {
    addImage: function () {
      wx.chooseMedia({
        count: 9 - this.data.images.length,
        mediaType: 'image',
        success: (res) => {
          this.setData({ 'images': this.data.images.concat(res.tempFiles.map(i => i.tempFilePath)) })
          if (this.data.images.length == 9) {
            this.setData({ 'canAddImage': false, 'addImageText': '最多9张图片' })
            return
          }
          this.trigger()
        }
      })
    },
    previewImage: function (e) {
      wx.previewImage({
        urls: this.data.images,
        current: this.data.images[e.currentTarget.dataset['index']]
      })
    },
    delImage: function (e) {
      wx.showModal({
        title: '警告',
        content: '是否删除该图片',
        complete: (res) => {
          if (res.confirm) {
            let images = this.data.images
            images.splice(e.currentTarget.dataset['index'], 1)
            this.setData({ 'images': images })
            this.trigger()
          }
        }
      })
    },
    trigger: function () {
      this.triggerEvent('input', { key: 'images', value: this.data.images })
    }
  }
})