import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

import { isOrganizerApp } from 'features/router/utils'
import Maps from 'components/maps'
import Markdown from 'components/markdown'
import CopyInput from 'components/copyInput'
import { LoadingIndicator } from 'components/loader'
import Banner from './banner'
import Address from './addressBlock'
import List from './listBlock'
import Cfp from './cfpBlock'
import Website from './websiteBlock'
import Contact from './contactBlock'
import Dates from './eventDates'
import { useEvent } from '../useEvents'

import './event.css'

const Event = () => {
  const { pathname } = useLocation()
  const { eventId } = useParams()
  const { data: event, isLoading } = useEvent(eventId)

  if (isLoading) return <LoadingIndicator />

  return (
    <div className="event-wrapper">
      <Banner
        className="event-header"
        eventId={event.id}
        name={event.name}
        type={event.type}
        address={event.address}
        bannerUrl={event.bannerUrl}
      />
      <div className="event-page">
        <div className="event-page-content">
          <Cfp className="event-page-cfp" event={event} />
          <div>
            {isOrganizerApp(pathname) && (
              <CopyInput
                title="Share link"
                className="event-share"
                value={`${origin}/public/event/${event.id}`}
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
          {event.address && <Maps address={event.address.formattedAddress} />}
          <div className="event-page-info-detail">
            {event.isConference() && <Dates dates={event.conferenceDates} large />}
            {event.address && <Address address={event.address.formattedAddress} />}
            {event.website && <Website website={event.website} />}
            {event.contact && <Contact contact={event.contact} />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Event
