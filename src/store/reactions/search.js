/* eslint-disable import/prefer-default-export */
import { dateToTimestamp } from 'helpers/date'

export const searchEvents = async (action, store, { router, algolia }) => {
  router.push('search')

  store.ui.search.events.update({ loading: true, ...action.payload })

  const { query, location, date } = store.ui.search.events.get()

  const commonFilters = ['visibility:public']
  const conferenceFilters = [...commonFilters]
  const meetupFilters = [...commonFilters]

  const geolocation = {}
  if (location && location.latLng) {
    const { lat, lng } = location.latLng
    geolocation.aroundLatLng = `${lat}, ${lng}`
  }

  if (date) {
    // @TODO date in UTC and start at 00:00
    conferenceFilters.push(`conferenceDates.end >= ${dateToTimestamp(date)}`)
  }

  const conferences = await algolia
    .getIndex('conference')
    .search({ query, ...geolocation, filters: conferenceFilters.join(' AND ') })

  const meetups = await algolia
    .getIndex('meetup')
    .search({ query, ...geolocation, filters: meetupFilters.join(' AND ') })

  store.ui.search.events.update({
    loading: false,
    totalConferences: conferences.nbHits,
    conferences: conferences.hits,
    totalMeetups: meetups.nbHits,
    meetups: meetups.hits,
  })
}
