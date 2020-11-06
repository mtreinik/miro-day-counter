const APP_ID = "3074457351323246950"

async function updateDayCounters() {
  const stickers = await miro.board.widgets.get({type: 'sticker'})
  stickers.forEach(sticker => {
    if (sticker.metadata[APP_ID]) {
      const startDateStr = sticker.metadata[APP_ID].dayCounterStartDate
      if (startDateStr) {
        const days = getDaysNow(new Date(startDateStr))
        if (days !== sticker.text) {
          sticker.text = days
          miro.board.widgets.update([sticker])
        }
      }
    }
  })
}
