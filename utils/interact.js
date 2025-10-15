export function warnModal(text, func) {
  wx.showModal({
    title: '警告',
    content: text,
    complete: (res) => {
      if (res.confirm) {
        func()
      }
    }
  })
}
export function errorToast(text) {
  wx.showToast({
    title: text,
    icon: 'error'
  })
}