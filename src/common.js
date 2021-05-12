async function updateDayCounters() {
  const stickers = await miro.board.widgets.get({ type: 'sticker' })
  const stickersToUpdate = []
  stickers.forEach((sticker) => {
    if (sticker.metadata[APP_ID]) {
      const {
        startDate,
        descriptionBefore,
        descriptionAfter,
      } = sticker.metadata[APP_ID]
      if (startDate) {
        const days = getDaysNow(new Date(startDate))
        const text = getText(days, descriptionBefore, descriptionAfter)
        if (text !== sticker.text) {
          sticker.text = text
          stickersToUpdate.push(sticker)
        }
      }
    }
  })
  await miro.board.widgets.update(stickersToUpdate)
}

function getDays(fromDate, toDate) {
  if (!fromDate || !toDate) {
    return undefined
  }
  const fromMillis = Date.UTC(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate()
  )
  const toMillis = Date.UTC(
    toDate.getFullYear(),
    toDate.getMonth(),
    toDate.getDate()
  )

  const days = Math.floor((toMillis - fromMillis) / (1000 * 60 * 60 * 24))
  return '' + days
}

function getDaysNow(fromDate) {
  return getDays(fromDate, new Date())
}

function getText(days, descriptionBefore, descriptionAfter) {
  return (
    (descriptionBefore ? descriptionBefore + ' ' : '') +
    days +
    (descriptionAfter ? ' ' + descriptionAfter : '')
  )
}
