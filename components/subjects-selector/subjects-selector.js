const data = require('../../utils/data')
Component({
  data: {
    subjects: [],
    // the value is the subject id
    // default id is 1
    value: 1,
    selectedSubjectName: ''
  },
  methods: {
    initData: function (d) {
      // d = { value: 1 }
      this.setData(d)
      this.trigger()
    },
    onPickerChange: function (e) {
      // e.detail.value is the index
      this.setData({ value: this.data.subjects[e.detail.value].id })
      this.trigger()
    },
    trigger: function () {
      // this funtion send the result to the father component
      this.setData({ selectedSubjectName: this.data.subjects.filter(i => i.id == this.data.value)[0].name })
      this.triggerEvent('input', { key: 'categoryId', value: this.data.value })
    },
    clear: function () {
      this.setData({ value: 1 })
      this.trigger()
    }
  },
  lifetimes: {
    attached: function () {
      this.setData({ 'subjects': data.getSubjects() })
    }
  }
})