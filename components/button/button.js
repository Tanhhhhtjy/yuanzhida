Component({
  properties: {
    'text': { type: String, value: '按钮' }, 'disabled': { type: Boolean, value: false }
  },
  data: {

  },
  methods: {
    _ontap: function () {
      this.triggerEvent('the_tap')
    }
  }
})