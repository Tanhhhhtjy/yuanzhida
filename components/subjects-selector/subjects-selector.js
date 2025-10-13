const data = require('../../utils/data')
Component({

  data: {
    subjects: [],
    id: 0
  },

  methods: {
    onPickerChange: function (e) {
      let id = e.detail.value
      this.setData({ 'id': id })
      this.trigger()
    },
    trigger: function () {
      this.triggerEvent('input', { key: 'categoryId', value: this.data.subjects[this.data.id]['id'] })
    },
    clear: function () {
      this.setData({ id: 0 })
    }
  },
  lifetimes: {
    attached: function () {
      this.setData({ 'subjects': data.getSubjects() })
      this.trigger()
    }
  }
})