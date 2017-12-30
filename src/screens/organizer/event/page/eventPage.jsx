import React from 'react'
import PropTypes from 'prop-types'
import Markdown from 'react-markdown'
import { Link } from 'redux-little-router'

import IconLabel from 'components/iconLabel'
import IconLink from 'components/iconLink'
import './eventPage.css'

const EventInfo = ({
  id, name, description, address, website, categories, formats,
}) => (
  <div className="event-page">
    <div className="event-header card">
      <h2>
        <IconLabel icon="fa fa-calendar-check-o" label={name} />
      </h2>
      <Link href={`/organizer/event/${id}/edit`} className="btn btn-primary">
        <IconLabel icon="fa fa-pencil" label="Edit" />
      </Link>
    </div>
    <div className="event-content card">
      <div className="event-links">
        <IconLink href={website} label="Website" icon="fa fa-globe" />
        <IconLink
          href={`https://www.google.com/maps/place/${encodeURI(address)}`}
          label={address}
          icon="fa fa-map-marker"
        />
      </div>
      <div className="event-description">
        {description && <Markdown className="markdown" source={description} escapeHtml />}
        <h3>Talk categories</h3>
        <div>{categories.map(c => c.name).join(', ')}</div>
        <h3>Talk formats</h3>
        <div>{formats.map(c => c.name).join(', ')}</div>
      </div>
    </div>
    <div className="event-cfp card">
      <h3>Call for paper</h3>
    </div>
  </div>
)

EventInfo.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  address: PropTypes.string,
  website: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.object),
  formats: PropTypes.arrayOf(PropTypes.object),
}

EventInfo.defaultProps = {
  address: undefined,
  website: undefined,
  categories: {},
  formats: {},
}

export default EventInfo
