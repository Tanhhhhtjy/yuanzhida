const util = require('../../utils/util')
Component({
  data: {
    username: '',
    avatar: '/assets/image/me.png',
    time: ''
  },
  methods: {
    updateData: function (d) {
      this.setData(d)
    }
  }
})