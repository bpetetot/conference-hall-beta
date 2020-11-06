import { useMutation, useQuery, useQueryCache } from 'react-query'
import { fetchSettings, updateSettings, createSettings } from 'firebase/events'

export const useEventSettings = (eventId) => {
  return useQuery(['eventSettings', eventId], async () => {
    if (!eventId) return null
    const result = await fetchSettings(eventId)
    if (!result.exists) {
      await createSettings(eventId)
      return {}
    }
    return result.data()
  })
}

export const useSaveEventSettings = (eventId) => {
  const cache = useQueryCache()
  return useMutation(async (data) => {
    if (!eventId) return null
    await updateSettings(eventId, data)
    return cache.invalidateQueries(['eventSettings', eventId])
  })
}
