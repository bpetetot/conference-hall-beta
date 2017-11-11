import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import EventMap from '../../../../components/maps'
import IconLabel from '../../../../components/iconLabel'
import './eventInfo.css'

const EventInfo = ({
  name, description, address, website,
}) => (
  <div className="event-info">
    <div className="event-header">
      <h1>{name}</h1>
      {website && (
        <div>
          <a href={website} target="NEW">
            <IconLabel icon="fa fa-globe" label="Website" />
          </a>
        </div>
      )}
      {address && (
        <div>
          <a href={`https://www.google.com/maps/place/${encodeURI(address)}`} target="NEW">
            <IconLabel icon="fa fa-map-marker" label={address} />
          </a>
        </div>
      )}
    </div>
    <div className="event-content">
      <ReactMarkdown className="markdown" source={description} escapeHtml />
    </div>
    {address && (
      <div className="event-map">
        <EventMap address={address} />
      </div>
    )}
  </div>
)

EventInfo.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  address: PropTypes.string,
  website: PropTypes.string,
}

EventInfo.defaultProps = {
  address: undefined,
  website: undefined,
}

export default EventInfo
