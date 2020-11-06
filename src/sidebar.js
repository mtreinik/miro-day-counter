const errorElement = document.getElementById('day-counter-error')

async function insertDayCounters() {
  errorElement.innerText = ''
  const startDate = new Date(document.getElementById('day-counter-start-date').value)
  const descriptionBefore = document.getElementById('day-counter-description-before').value
  const descriptionAfter = document.getElementById('day-counter-description-after').value
  const selectedWidgets = await miro.board.selection.get()

  if (!selectedWidgets || selectedWidgets.length === 0) {
    errorElement.innerText = 'Please select a sticker for inserting day counter.'
    return
  }
  selectedWidgets.forEach(widget => {
    if (typeof widget.text === 'string') {
      widget.metadata[APP_ID] = { startDate, descriptionBefore, descriptionAfter }
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
    if (widget.metadata[APP_ID]) {
      const { startDate: startDateStr, descriptionBefore, descriptionAfter } = widget.metadata[APP_ID]
      if (startDateStr) {
        const startDate = new Date(startDateStr)
        const days = startDate ? getDaysNow(startDate) : ''
        const text = getText(days, descriptionBefore, descriptionAfter)
        dayCounters.push({startDate, text})
      }
    }
  })

  const widgetInfoElement = document.getElementById('day-counter-widget-info')
  widgetInfoElement.innerHTML = dayCounters.length === 0
    ? 'No selected day counter stickers.'
    : '<ul>' + dayCounters.map(
    dayCounter => '<li>' + dayCounter.startDate.toISOString() + ': ' + dayCounter.text + '</li>'
  ).join('') + '</ul>'
}

miro.onReady(async () => {
  miro.addListener(miro.enums.event.SELECTION_UPDATED, getSelectedWidgets)
  await getSelectedWidgets()
})