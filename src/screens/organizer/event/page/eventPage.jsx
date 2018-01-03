import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'redux-little-router'

import Titlebar from 'components/titlebar'
import IconLabel from 'components/iconLabel'
import CopyInput from 'components/copyInput'
import Maps from 'components/maps'

import Address from './addressBlock'
import List from './listBlock'
import Description from './descriptionBlock'
import Cfp from './cfpBlock'
import Dates from './datesBlock'
import Website from './websiteBlock'

import './eventPage.css'

const EventPage = ({
  id,
  name,
  type,
  address,
  conferenceDates,
  description,
  website,
  categories,
  formats,
}) => (
  <div className="event-page">
    <Titlebar icon="fa fa-calendar-check-o" title={name} className="event-page-header">
      <CopyInput title="Share link" />
      <Link href={`/organizer/event/${id}/edit`} className="btn btn-primary">
        <IconLabel icon="fa fa-pencil" label="Edit" />
      </Link>
    </Titlebar>
    <div className="event-page-content card">
      <Cfp className="event-cfp" />
      <Description className="event-content" description={description} />
      <List className="event-categories" title="Talk categories" list={categories} />
      <List className="event-formats" title="Talk formats" list={formats} />
    </div>
    <div className="event-page-info card">
      <Maps address={address} />
      {type === 'conference' && <Dates className="event-date" dates={conferenceDates} />}
      <Address className="event-address" address={address} />
      <Website className="event-date" website={website} />
    </div>
  </div>
)

EventPage.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  type: PropTypes.string,
  address: PropTypes.string,
  conferenceDates: PropTypes.objectOf(PropTypes.instanceOf(Date)),
  description: PropTypes.string,
  website: PropTypes.string,
  categories: PropTypes.arrayOf(PropTypes.object),
  formats: PropTypes.arrayOf(PropTypes.object),
}

EventPage.defaultProps = {
  name: undefined,
  type: undefined,
  address: undefined,
  conferenceDates: {},
  description: undefined,
  website: undefined,
  categories: [],
  formats: [],
}

export default EventPage
