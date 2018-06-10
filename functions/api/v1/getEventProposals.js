module.exports = (req, res) => {
  res.send({
    eventId: req.params.eventId,
  })
}
