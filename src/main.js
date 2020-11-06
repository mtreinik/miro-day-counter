const icon =
  '<g transform="translate(0,-273)" id="layer1"> ' +
  '  <rect y="275.80444" x="0.8976934" height="20.108871" width="22.017113"  fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /> ' +
  '  <path d="M 1.3713342,280.65253 H 22.436299"         fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" /> ' +
  '  <path d="m 4.7768557,273.93738 v 3.54453"           fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" /> ' +
  '  <path d="m 18.917375,273.93738 v 3.54453"           fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" /> ' +
  '  <path d="m 10.179103,284.08747 -0.6928713,8.73018"  fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" /> ' +
  '  <path d="M 20.449995,286.56081 3.6153233,290.08396" fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" /> ' +
  '  <path d="m 14.412436,284.08747 -0.692871,8.73018"   fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" /> ' +
  '  <path d="m 18.645769,284.08747 -0.692871,8.73018"   fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" /> ' +
  '  <path d="m 5.9457693,284.08747 -0.6928709,8.73018"  fill="none" stroke="#000000" stroke-width="1.5" stroke-linecap="round" /> ' +
  '</g>'

miro.onReady(async () => {
  miro.initialize({
    extensionPoints: {
      bottomBar: {
        title: 'Day Counter',
        svgIcon: icon,
        positionPriority: 1,
        onClick: () => {
          miro.board.ui.openLeftSidebar('sidebar.html')
        },
      },
    },
  })
  setInterval(updateDayCounters, 60 * 1000)
  updateDayCounters()
})
