let icon = '<circle cx="12" cy="12" r="9" fill="none" fill-rule="evenodd" stroke="currentColor" stroke-width="2"></circle>'

function getDays(fromDate, toDate) {
  if (!fromDate || !toDate) {
    return undefined
  }
  const fromMillis = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate())
  const toMillis = Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())

  const days = Math.floor((toMillis - fromMillis) / (1000 * 60 * 60 * 24))
  return '' + days
}

async function updateDayCounters() {
  const stickers = await miro.board.widgets.get({type: 'sticker'})
  let updatedStickers = []

  stickers.forEach(sticker => {
    if (sticker.metadata[APP_ID]) {
      const startDateStr = sticker.metadata[APP_ID].dayCounterStartDate
      if (startDateStr) {
        sticker.text = getDays(new Date(startDateStr), new Date())
        updatedStickers.push(sticker)
      }
    }
  })
  if (updatedStickers.length > 0) {
    console.log(`updating ${updatedStickers.length} stickers`)
    await miro.board.widgets.update(updatedStickers)
  }
}

miro.onReady(async () => {
  miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Day Counter',
        svgIcon: icon,
        positionPriority: 1,
        onClick: () => {
          miro.board.ui.openLeftSidebar('sidebar.html')
        }
      }
    }
  })
  await updateDayCounters()
  setInterval(updateDayCounters, 5000)
})