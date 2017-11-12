import React from 'react'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'

import EventMap from '../../../../components/maps'
import IconLink from '../../../../components/iconLink'
import './eventInfo.css'

const EventInfo = ({
  name, description, address, website,
}) => (
  <div className="event-info">
    <div className="event-header">
      <h1>{name}</h1>
      <div className="event-header-links">
        <IconLink href={website} label="Website" icon="fa fa-globe" />
        <IconLink
          href={`https://www.google.com/maps/place/${encodeURI(address)}`}
          label={address}
          icon="fa fa-map-marker"
        />
      </div>
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
