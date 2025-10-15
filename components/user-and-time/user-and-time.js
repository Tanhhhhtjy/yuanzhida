const util = require('../../utils/util')
Component({
  data: {
    username: '',
    avatar: '/assets/image/me.png',
    time: ''
  },
  methods: {
    initData: function (d) {
      this.setData(d)
    }
  }
})