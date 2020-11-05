const widgetDateElement = document.getElementById('day-counter-start-date')
const errorElement = document.getElementById('day-counter-error')
const widgetInfoElement = document.getElementById('day-counter-widget-info')

async function insertDayCounters() {
  errorElement.innerText = ''
  const startDate = new Date(widgetDateElement.value)
  const selectedWidgets = await miro.board.selection.get()

  if (!selectedWidgets || selectedWidgets.length === 0) {
    errorElement.innerText = 'Please select a sticker for inserting day counter.'
    return
  }
  selectedWidgets.forEach(widget => {
    if (typeof widget.text === 'string') {
      widget.metadata[APP_ID] = {dayCounterStartDate: startDate}
      widget.capabilities.editable = false
    }
  })
  miro.board.widgets.update(selectedWidgets)
}

async function getSelectedWidgets() {
  const selectedWidgets = await miro.board.selection.get()
  const dayCounters = []
  selectedWidgets.forEach(widget => {
    if (widget.metadata[APP_ID]) {
      const startDateStr = widget.metadata[APP_ID].dayCounterStartDate
      const startDate = new Date(startDateStr)
      const days = startDateStr ? getDaysNow(startDate) : ''
      dayCounters.push({startDate, days})
    }
  })

  widgetInfoElement.innerHTML = dayCounters.length === 0
    ? 'No selected day counter stickers.'
    : '<ul>' + dayCounters.map(
    dayCounter => '<li>' + dayCounter.startDate.toISOString() + ': ' + dayCounter.days + '</li>'
  ).join('') + '</ul>'
}

miro.onReady(async () => {
  miro.addListener(miro.enums.event.SELECTION_UPDATED, getSelectedWidgets)
  await getSelectedWidgets()
})