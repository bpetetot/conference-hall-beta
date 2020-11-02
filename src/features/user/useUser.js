/* eslint-disable import/prefer-default-export */
import userCrud, { fetchUsersByEmail, fetchUsersList } from 'firebase/user'
import sortBy from 'lodash/sortBy'
import { useQuery } from 'react-query'

export const useUser = (userId) => {
  return useQuery(['user', userId], async () => {
    if (!userId) return null
    const result = await userCrud.read(userId)
    if (!result.exists) return null
    return result.data()
  })
}

// TODO refactor with useQueries in react-query 3
export const useUsers = (userIds) => {
  return useQuery(['user-by-ids', userIds], async () => {
    if (!userIds || userIds.length === 0) return []
    const results = await fetchUsersList(userIds)
    return sortBy(results, 'displayName')
  })
}

export const useUsersByEmail = (email) => {
  return useQuery(['user-by-email', email], async () => {
    if (!email) return null
    return fetchUsersByEmail(email)
  })
}
