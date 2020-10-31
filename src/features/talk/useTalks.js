import { useQuery } from 'react-query'

import { useAuth } from 'features/auth'
import { fetchUserTalks } from 'firebase/talks'
import { FILTERS } from 'models/Talk'

export const useTalks = () => {
  const { user } = useAuth()
  return useQuery(['talks', user?.uid], async (key, userId) => {
    if (!userId) return {}
    return fetchUserTalks(userId)
  })
}

export const useFilteredTalks = (status) => {
  const result = useTalks()
  const filteredTalks = result.data?.filter((talk) => {
    if (status === FILTERS.ALL) return true
    if (status === FILTERS.ARCHIVED) return talk.archived === true
    return talk.archived !== true
  })
  return { ...result, data: filteredTalks }
}
