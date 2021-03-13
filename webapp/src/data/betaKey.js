import firebase from 'firebase/app'
import { useMutation, useQueryClient } from 'react-query'

/* eslint-disable import/prefer-default-export */
async function validateBetaKey(key) {
  const token = await firebase.auth().currentUser.getIdToken()
  const response = await fetch('/api/users/me/beta', {
    headers: {
      authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'PATCH',
    body: JSON.stringify({ key }),
  })
  return response.status === 204
}

export function useValidateBetaKey() {
  const queryClient = useQueryClient()
  return useMutation((key) => validateBetaKey(key), {
    onSuccess: () => {
      queryClient.invalidateQueries('users/me')
    },
  })
}
