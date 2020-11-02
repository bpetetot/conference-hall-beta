import { useMutation, useQuery, useQueryCache } from 'react-query'

import { getSurvey, saveSurvey } from 'firebase/survey'

export const useSurvey = (eventId, userId) => {
  return useQuery(['survey', eventId, userId], async () => {
    if (!eventId || !userId) return null
    const result = await getSurvey(eventId, userId)
    return result.data()
  })
}

export const useSaveSurvey = (eventId, userId) => {
  const cache = useQueryCache()
  return useMutation(async (data) => {
    await saveSurvey(eventId, userId, data)
    await cache.invalidateQueries(['survey', eventId, userId])
  })
}
