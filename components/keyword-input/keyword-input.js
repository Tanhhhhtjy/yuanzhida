const api = require('../../utils/api')
Component({
  data: {
    solvedFilterText: '全部',
    solvedFilterIndex: 2,
    SuggestedWords: []
  },
  methods: {
    solvedFilterChange: function () {
      this.setData({ solvedFilterIndex: (this.data.solvedFilterIndex + 1) % 3 })
      const textList = ['未解决', '已解决', '全部']
      this.setData({ solvedFilterText: textList[this.data.solvedFilterIndex] })
      this.updateQuestion()
    },
    onKeywordChange: function (e) {
      api.keywordSuggest(e.detail.value).then(res => {
        this.setData({ SuggestedWords: res })
      }).catch(err => {
        console.error(err);
      })
    },
    chooseSuggestion: function (e) {
      this.selectComponent('#input').updateData(e.currentTarget.dataset.text)
    }
  }
})