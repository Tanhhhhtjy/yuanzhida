Component({

  data: {
    value: [],
    'canAddImage': true,
    'addImageText': '添加图片'
  },
  methods: {
    updateData: function (d) {
      this.setData({ value: d.value })
    },
    addImage: function () {
      wx.chooseMedia({
        count: 9 - this.data.value.length,
        mediaType: 'image',
        success: (res) => {
          this.setData({ value: this.data.value.concat(res.tempFiles.map(i => i.tempFilePath)) })
          if (this.data.value.length == 9) {
            this.setData({ 'canAddImage': false, 'addImageText': '最多9张图片' })
            return
          }
          this.trigger()
        }
      })
    },
    clear: function () {
      this.setData({ value: [] })
    },
    previewImage: function (e) {
      wx.previewImage({
        urls: this.data.value,
        current: this.data.value[e.currentTarget.dataset['index']]
      })
    },
    delImage: function (e) {
      wx.showModal({
        title: '警告',
        content: '是否删除该图片',
        complete: (res) => {
          if (res.confirm) {
            let value = this.data.value
            value.splice(e.currentTarget.dataset['index'], 1)
            this.setData({ 'value': value })
            this.trigger()
          }
        }
      })
    },
    trigger: function () {
      this.triggerEvent('input', { key: 'images', value: this.data.value })
    }
  }
})