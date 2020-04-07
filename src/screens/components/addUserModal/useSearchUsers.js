import { useState, useCallback } from 'react'

import { fetchUsersByEmail } from 'firebase/user'

export default () => {
  const [email, setEmail] = useState(null)
  const [users, setUsers] = useState(null)
  const [loading, setLoading] = useState(false)

  const searchUsers = useCallback(async (searchedEmail) => {
    setLoading(true)
    setEmail(searchedEmail)
    const results = await fetchUsersByEmail(searchedEmail)
    setUsers(results)
    setLoading(false)
  }, [])

  return { users, loading, email, searchUsers }
}
