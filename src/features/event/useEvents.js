import { useMutation, useQuery, useQueryCache } from 'react-query'
import eventCrud, {
  fetchOrganizationEvents,
  fetchPublicEvents,
  fetchUserEvents,
} from 'firebase/events'
import { useAuth } from 'features/auth'
import { useOrganizations } from 'features/organization/useOrganizations'
import flatten from 'lodash/flatten'
import uniqBy from 'lodash/uniqBy'

export const useEvent = (eventId) => {
  return useQuery(['event', eventId], async () => {
    if (!eventId) return null
    const result = await eventCrud.read(eventId)
    return result.data()
  })
}

export const useSaveEvent = (eventId) => {
  const { user } = useAuth()
  const cache = useQueryCache()
  return useMutation(async (data) => {
    if (eventId) {
      await eventCrud.update({ id: eventId, ...data })
      return cache.invalidateQueries(['event', eventId])
    }
    return eventCrud.create({ ...data, owner: user.uid })
  })
}

export const useOrganizerEvents = () => {
  const { user } = useAuth()
  const { data: organizations, isFetched } = useOrganizations()
  const organizationIds = organizations?.map((orga) => orga.id) || []

  return useQuery(
    ['events', user?.uid],
    async () => {
      if (!user?.uid) return null
      const ownerEvents = await fetchUserEvents(user?.uid)
      const organizationsEvents = await Promise.all(organizationIds.map(fetchOrganizationEvents))
      // TODO remove events where user is owner but not in event organization
      return uniqBy(ownerEvents.concat(flatten(organizationsEvents)), 'id')
    },
    {
      enabled: user?.uid && isFetched,
    },
  )
}

export const usePublicEvents = () => {
  return useQuery(['events', 'public'], async () => {
    // TODO improve to avoid fetching all events then filter them locally
    const events = await fetchPublicEvents()
    return events.filter((event) => event.isCfpOpened())
  })
}
