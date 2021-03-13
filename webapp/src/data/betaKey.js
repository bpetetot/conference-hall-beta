import { useAuth } from 'features/auth'
import { useMutation, useQueryClient } from 'react-query'
import { fetchData } from './fetch'

async function validateBetaKey(key) {
  return fetchData({
    method: 'PATCH',
    url: '/api/users/me/beta',
    auth: true,
    body: { key },
  })
}

export function useValidateBetaKey() {
  const queryClient = useQueryClient()
  const { user } = useAuth()
  return useMutation(validateBetaKey, {
    onSuccess: (data, betaAccess) => {
      queryClient.setQueryData('users/me', { ...user, betaAccess })
    },
  })
}
