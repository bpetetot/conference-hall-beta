/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import { useNavigate } from 'react-router-dom'

import { useUser } from '../../data/user'

const STATES = {
  PENDING: 'PENDING',
  SIGNED_IN: 'SIGNED_IN',
  SIGNED_OUT: 'SIGNED_OUT',
}

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

// TODO Add Unit Tests
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate()

  const [authState, setAuthState] = useState(STATES.PENDING)
  const isSignedIn = authState === STATES.SIGNED_IN
  const isPending = authState === STATES.PENDING

  const { data: user, isLoading, isSuccess } = useUser(isSignedIn)

  const isAuthenticated = isSignedIn && isSuccess
  const isAuthenticating = isPending || isLoading

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (authenticated) => {
      if (authenticated) {
        setAuthState(STATES.SIGNED_IN)
      } else {
        setAuthState(STATES.SIGNED_OUT)
      }
    })
  }, [])

  const signin = useCallback(async (providerName) => {
    let provider
    switch (providerName) {
      case 'google':
        provider = new firebase.auth.GoogleAuthProvider()
        break
      case 'twitter':
        provider = new firebase.auth.TwitterAuthProvider()
        break
      case 'github':
        provider = new firebase.auth.GithubAuthProvider()
        break
      case 'facebook':
        provider = new firebase.auth.FacebookAuthProvider()
        break
      default:
        return
    }
    provider.setCustomParameters({ prompt: 'select_account' })

    await firebase.auth().signInWithRedirect(provider)
  }, [])

  const signout = useCallback(async () => {
    navigate('/')
    await firebase.auth().signOut()
    localStorage.removeItem('currentEventId')
  }, [navigate])

  const value = useMemo(
    () => ({
      user,
      isAuthenticating,
      isAuthenticated,
      signin,
      signout,
    }),
    [user, isAuthenticated, isAuthenticating, signin, signout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
}
