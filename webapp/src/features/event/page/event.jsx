import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { isOrganizerApp } from 'features/router/utils'
import Maps from 'components/maps'
import Markdown from 'components/markdown'
import CopyInput from 'components/copyInput'
import Banner from './banner'
import Address from './addressBlock'
import List from './listBlock'
import Cfp from './cfpBlock'
import Website from './websiteBlock'
import Contact from './contactBlock'
import Dates from './eventDates'

import './event.css'
import { useEvent } from '../../../data/event'

const Event = () => {
  const { pathname } = useLocation()
  const { eventId } = useParams()

  const { data: event, isSuccess } = useEvent(eventId)

  if (!isSuccess) {
    return 'Loading...'
  }

  return (
    <div className="event-wrapper">
      <Banner
        className="event-header"
        eventId={eventId}
        name={event.name}
        type={event.type}
        address={event.address}
        bannerUrl={event.bannerUrl}
        cfpOpened={event.isCfpOpened}
      />
      <div className="event-page">
        <div className="event-page-content">
          <Cfp
            type={event.type}
            cfpStart={event.cfpStart}
            cfpEnd={event.cfpEnd}
            cfpOpened={event.isCfpOpened}
            cfpFinished={event.isCfpFinished}
            className="event-page-cfp"
          />
          <div>
            {isOrganizerApp(pathname) && (
              <CopyInput
                title="Share link"
                className="event-share"
                value={`${origin}/public/event/${eventId}`}
              />
            )}
            <Markdown className="event-description" source={event.description} />
            <div className="event-lists">
              <List title="Talk categories" list={event.categories} />
              <List title="Talk formats" list={event.formats} />
            </div>
          </div>
        </div>
        <div className="event-page-info">
          {event.address && <Maps address={event.address} />}
          <div className="event-page-info-detail">
            {event.type === 'CONFERENCE' && (
              <Dates startDate={event.conferenceStart} endDate={event.conferenceEnd} large />
            )}
            {event.address && <Address address={event.address} />}
            {event.website && <Website website={event.website} />}
            {event.contact && <Contact contact={event.contact} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Event
