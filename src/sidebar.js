const errorElement = document.getElementById('day-counter-error')
const dayCounterInsertElement = document.getElementById('day-counter-insert')

async function insertDayCounters() {
  errorElement.innerText = ''
  dayCounterInsertElement.className = 'miro-input-field'
  const startDate = new Date(document.getElementById('day-counter-start-date').value)
  const descriptionBefore = document.getElementById('day-counter-description-before').value
  const descriptionAfter = document.getElementById('day-counter-description-after').value
  const selectedWidgets = await miro.board.selection.get()

  if (!selectedWidgets || selectedWidgets.length === 0) {
    dayCounterInsertElement.className += ' miro-input-field--invalid'
    errorElement.innerText = 'Please select a sticker for inserting day counter.'
    return
  }
  selectedWidgets.forEach(widget => {
    if (typeof widget.text === 'string') {
      widget.metadata[APP_ID] = {startDate, descriptionBefore, descriptionAfter}
      widget.capabilities.editable = false
    }
  })
  await miro.board.widgets.update(selectedWidgets)
  await updateDayCounters()
}

async function getSelectedWidgets() {
  const selectedWidgets = await miro.board.selection.get()
  const dayCounters = []
  selectedWidgets.forEach(widget => {
    const stickerBackgroundColor = widget.style.stickerBackgroundColor
    if (widget.metadata[APP_ID] && widget.metadata[APP_ID].startDate) {
      const {startDate: startDateStr, descriptionBefore, descriptionAfter} = widget.metadata[APP_ID]
      const startDate = new Date(startDateStr)
      const days = startDate ? getDaysNow(startDate) : ''
      const text = getText(days, descriptionBefore, descriptionAfter)
      dayCounters.push({startDate, text, stickerBackgroundColor})
    } else {
      dayCounters.push({text: widget.plainText, stickerBackgroundColor})
    }
  })

  const widgetInfoElement = document.getElementById('day-counter-widget-info')
  widgetInfoElement.innerHTML = dayCounters.length === 0
    ? '<span style="color: #827F9B">No selected stickers.</span>'
    : '<ul style="list-style: none;">' + dayCounters.map(
    dayCounter => '<li>' +
      '<span style="font-size: xx-large; color: ' + dayCounter.stickerBackgroundColor + '">■</span>' +
      '<br />' +
      dayCounter.text + '' +
      '<br />' +
      (dayCounter.startDate
        ? '(day counter starts at ' + dayCounter.startDate.toISOString().split('T')[0] + ')'
        : '(no day counter)') +
      '</li>'
  ).join('') + '</ul>'
}

miro.onReady(async () => {
  miro.addListener(miro.enums.event.SELECTION_UPDATED, getSelectedWidgets)
  await getSelectedWidgets()
})