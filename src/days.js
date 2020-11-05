function getDays(fromDate, toDate) {
  if (!fromDate || !toDate) {
    return undefined
  }
  const fromMillis = Date.UTC(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate())
  const toMillis = Date.UTC(toDate.getFullYear(), toDate.getMonth(), toDate.getDate())

  const days = Math.floor((toMillis - fromMillis) / (1000 * 60 * 60 * 24))
  return '' + days
}

function getDaysNow(fromDate) {
  return getDays(fromDate, new Date())
}
