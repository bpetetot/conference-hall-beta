module.exports = (req, res) => {
  const { event } = res.locals
  res.send(event)
}
