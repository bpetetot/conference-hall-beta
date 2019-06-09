import React from 'react'
import PropTypes from 'prop-types'

import Maps from 'components/maps'
import Markdown from 'components/markdown'
import CopyInput from 'components/copyInput'
import Banner from './banner'
import Address from './addressBlock'
import List from './listBlock'
import Cfp from './cfpBlock'
import Website from './websiteBlock'
import Contact from './contactBlock'
import Dates from '../eventDates'

import './event.css'

const Event = ({
  id,
  type,
  address,
  conferenceDates,
  description,
  website,
  contact,
  categories,
  formats,
  isOrganizer,
}) => (
  <div className="event-page">
    <Banner className="event-page-header" eventId={id} />
    <div className="event-page-content">
      <Cfp eventId={id} className="event-page-cfp" />
      <div>
        {isOrganizer && (
          <CopyInput
            title="Share link"
            className="event-share"
            value={`${origin}/public/event/${id}`}
          />
        )}
        <Markdown className="event-description" source={description} />
        <List className="event-lists" title="Talk categories" list={categories} />
        <List className="event-lists" title="Talk formats" list={formats} />
      </div>
    </div>
    <div className="event-page-info">
      {address && <Maps address={address.formattedAddress} />}
      <div className="event-page-info-detail">
        {type === 'conference' && <Dates dates={conferenceDates} large />}
        {address && <Address address={address.formattedAddress} />}
        {website && <Website website={website} />}
        {contact && <Contact contact={contact} />}
      </div>
    </div>
  </div>
)

Event.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  address: PropTypes.object,
  conferenceDates: PropTypes.objectOf(PropTypes.any),
  description: PropTypes.string,
  website: PropTypes.string,
  contact: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.object),
  formats: PropTypes.arrayOf(PropTypes.object),
  isOrganizer: PropTypes.bool.isRequired,
}

Event.defaultProps = {
  type: undefined,
  address: undefined,
  conferenceDates: {},
  description: undefined,
  website: undefined,
  contact: undefined,
  categories: [],
  formats: [],
}

export default Event
