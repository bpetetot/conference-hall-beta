import React from 'react'

const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY

const EventMaps = ({ address, ...rest }) => (
  <iframe
    title="Event maps"
    width="600"
    height="450"
    frameBorder="0"
    style={{ border: '0' }}
    src={`https://www.google.com/maps/embed/v1/place?key=${API_KEY}&q=${encodeURI(address)}`}
    allowFullScreen
  />
)

export default EventMaps
