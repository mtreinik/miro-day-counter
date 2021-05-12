const icon24 =
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
const icon48 =
  '<g transform="scale(2) translate(0,-273)" id="layer1"> ' +
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
const title = 'Day Counter'

function openSidebar() {
  miro.board.ui.openLeftSidebar('sidebar.html')
}

miro.onReady(async () => {
  miro.initialize({
    extensionPoints: {
      toolbar: {
        title,
        toolbarSvgIcon: icon24,
        librarySvgIcon: icon48,
        onClick: async () => {
          const authorized = await miro.isAuthorized()
          if (!authorized) {
            await miro.requestAuthorization()
          }
          openSidebar()
        },
      },
    },
  })
  setInterval(updateDayCounters, 60 * 1000)
  await updateDayCounters()
})
