/* eslint-disable import/prefer-default-export */
import userCrud, { fetchUsersByEmail } from 'firebase/user'
import { useQuery } from 'react-query'

export const useUser = (userId) => {
  return useQuery(['user', userId], async () => {
    if (!userId) return null
    const result = await userCrud.read(userId)
    if (!result.exists) return null
    return result.data()
  })
}

export const useUsersByEmail = (email) => {
  return useQuery(['user-by-email', email], async () => {
    if (!email) return null
    return fetchUsersByEmail(email)
  })
}
