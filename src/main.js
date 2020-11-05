let icon = '<g\n     transform="translate(0,-273)"\n     id="layer1">\n    ' +
  '<rect fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10.6" stroke-opacity="1"  y="275.80444" x="0.8976934" height="20.108871" width="22.017113" id="rect10" />' +
  '<path id="path4506" d="M 1.3713342,280.65253 H 22.436299" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="none" stroke-opacity="1" />\n    ' +
  '<path id="path4510" d="m 4.7768557,273.93738 v 3.54453" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="none" stroke-opacity="1"  />\n    ' +
  '<path d="m 18.917375,273.93738 v 3.54453" id="path4521" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="none" stroke-opacity="1" />\n    ' +
  '<path id="path4523" d="m 10.179103,284.08747 -0.6928713,8.73018" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="none" stroke-opacity="1"  />\n    ' +
  '<path d="M 20.449995,286.56081 3.6153233,290.08396" id="path4525" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="none" stroke-opacity="1" />\n    ' +
  '<path id="path4527" d="m 14.412436,284.08747 -0.692871,8.73018" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="none" stroke-opacity="1"  />\n    ' +
  '<path d="m 18.645769,284.08747 -0.692871,8.73018" id="path4529" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="none" stroke-opacity="1" />\n    ' +
  '<path d="m 5.9457693,284.08747 -0.6928709,8.73018" id="path4531" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="4" stroke-dasharray="none" stroke-opacity="1" />' +
  '</g>'

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