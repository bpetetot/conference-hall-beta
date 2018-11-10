import React from 'react'
import PropTypes from 'prop-types'

import Maps from 'components/maps'
import Markdown from 'components/markdown'
import Badge from 'components/badge'
import EventTitle from './eventTitle'
import EventActions from './eventActions'
import Address from './addressBlock'
import List from './listBlock'
import Cfp from './cfpBlock'
import Website from './websiteBlock'
import Contact from './contactBlock'
import Dates from '../eventDates'

import './event.css'

const Event = ({
  isOrganizer,
  id,
  name,
  type,
  address,
  conferenceDates,
  description,
  website,
  contact,
  categories,
  formats,
}) => (
  <div className="event-page">
    <EventTitle name={name} subtitle="Call for paper" className="event-page-header" />
    <Cfp eventId={id} className="event-page-cfp" />
    <EventActions className="event-page-actions" eventId={id} isOrganizer={isOrganizer} />
    <div className="event-page-content card">
      <Markdown className="event-content" source={description} />
      <List className="event-categories" title="Talk categories" list={categories} />
      <List className="event-formats" title="Talk formats" list={formats} />
    </div>
    <div className="event-page-info card">
      <Maps address={address} />
      <div className="event-page-info-detail">
        <Badge pill outline className="event-info-type">
          {type}
        </Badge>
        {type === 'conference' && <Dates dates={conferenceDates} large />}
        <Address address={address} />
        <Website website={website} />
        <Contact contact={contact} />
      </div>
    </div>
  </div>
)

Event.propTypes = {
  isOrganizer: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  address: PropTypes.string,
  conferenceDates: PropTypes.objectOf(PropTypes.any),
  description: PropTypes.string,
  website: PropTypes.string,
  contact: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.object),
  formats: PropTypes.arrayOf(PropTypes.object),
}

Event.defaultProps = {
  name: undefined,
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
