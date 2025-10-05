const init = require('./utils/init')
App({
  onLaunch: function () {
    init.load_subjects()
    init.auto_logout()
  }
})
