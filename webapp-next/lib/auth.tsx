import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'

import { User, useUser } from '../api/user'
import firebase, { signinWithFirebase } from './firebase'

const AuthContext = React.createContext(
  {} as {
    user?: User
    isLoading: boolean
    isAuthenticated: boolean
    signin: (providerName: string) => Promise<void>
    signout: () => Promise<void>
    error?: string
  },
)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoading, setLoading] = useState(true)
  const [isAuthenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState<string>()

  const { data: user, isLoading: isLoadingUser } = useUser(isAuthenticated)
  const queryClient = useQueryClient()

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      setAuthenticated(!!user)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    firebase.auth().getRedirectResult().catch(setError)
  }, [])

  const signin = (providerName: string) => {
    return signinWithFirebase(providerName).catch(setError)
  }

  const signout = async () => {
    await firebase.auth().signOut()
    setAuthenticated(false)
    queryClient.clear()
  }

  const value = {
    user,
    isLoading: isLoading || isLoadingUser,
    isAuthenticated: isAuthenticated && !!user,
    signin,
    signout,
    error,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
