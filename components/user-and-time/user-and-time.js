const util = require('../../utils/util')
Component({

  properties: {
    username: { type: String, value: '用户名' },
    avatar: { type: String, value: '/assets/image/me.png' },
    time: { type: String, value: '2025-10-01T08:00:00.000+00:00' }
  },

  data: {
    parsedTime: ''
  },
  observers: {
    'time': function () {
      this.setData({ parsedTime: util.parseTime(this.data.time) })
    }
  }
})