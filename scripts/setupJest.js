global.requestIdleCallback = cb => {
  setTimeout(() => {
    let time = 3
    cb({ timeRemaining () { return time-- } })
  })
}
