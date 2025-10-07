Component({
  properties: {
    'text': { type: String, value: '按钮' },
    'disabled': { type: Boolean, value: false },
    'size': { type: String, value: 'normal' }
  },
  data: {

  },
  methods: {
    _ontap: function () {
      if (this.data.disabled) {
        return
      }
      this.triggerEvent('the_tap')
    }
  }
})