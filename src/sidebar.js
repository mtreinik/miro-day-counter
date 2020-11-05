const widgetDateElement = document.getElementById('day-counter-start-date')
const errorElement = document.getElementById('day-counter-error')

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
      widget.metadata[APP_ID] = { dayCounterStartDate: startDate }
      widget.capabilities.editable = false
    }
  })
  miro.board.widgets.update(selectedWidgets)
}
