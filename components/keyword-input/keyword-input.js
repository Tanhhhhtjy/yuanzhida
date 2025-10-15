const api = require('../../utils/api')
Component({
  data: {
    solvedFilterText: '全部',
    solvedFilterIndex: 2,
    SuggestedWords: [],
    inputText: ''
  },
  methods: {
    solvedFilterChange: function () {
      this.setData({ solvedFilterIndex: (this.data.solvedFilterIndex + 1) % 3 })
      const textList = ['未解决', '已解决', '全部']
      this.setData({ solvedFilterText: textList[this.data.solvedFilterIndex] })
      this.submitKeyword()
    },
    submitKeyword: function () {
      this.triggerEvent('submitKeyword', { keyword: this.data.inputText, solvedFlag: this.data.solvedFilterIndex })
      this.setData({ SuggestedWords: [] })
    },
    onKeywordChange: function (e) {
      this.setData({ inputText: e.detail.value })
      api.keywordSuggest(this.data.inputText).then(res => {
        this.setData({ SuggestedWords: res })
      }).catch(err => {
        console.error(err);
      })
    },
    chooseSuggestion: function (e) {
      this.selectComponent('#input').initData({ value: e.currentTarget.dataset.text })
    }
  }
})