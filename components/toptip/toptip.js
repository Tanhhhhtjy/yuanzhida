Component({

  properties: {
    'type': {
      type: String, value: 'normal'
    },
    'text': {
      type: String, value: ''
    }
  },
  data: {
    'timer': null
  },
  observers: {
    'text': function (newVal) {
      if (newVal) {
        this.clearTimer()
        let timer = setTimeout(() => {
          this.clearTimer()
          this.setData({ 'text': '' })
        }, 3000);
        this.setData({ 'timer': timer })
      }
    }
  },

  methods: {
    clearTimer: function () {
      if (this.data.timer) {
        clearTimeout(this.data.timer)
        this.data.timer = null
      }
    }
  }
})