const api = require('../../utils/api')
Component({

  properties: {
    solvedFlag: { type: Boolean, value: false },
    viewCount: { type: Number, value: 0 },
    commentCount: { type: Number, value: 0 },
    likeCount: { type: Number, value: 0 },
    canDo: { type: Boolean, value: false },
    entityUserId: { type: Number, value: 0 },
    questionId: { type: Number, value: 0 }
  },
  methods: {
    like: function () {
      api.likeQuestion(this.data.questionId, this.data.entityUserId).then(res => {
        console.log(res);
      }).catch(err => {
        console.error(err);
      })
    }
  }
})