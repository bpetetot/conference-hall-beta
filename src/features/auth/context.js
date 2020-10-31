/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react'
import { inject } from '@k-ramel/react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import pick from 'lodash/pick'
import { useNavigate } from 'react-router-dom'

import { findOrCreateAuthUser, updateAuthUser } from 'firebase/user'
import { preloadFunctions } from 'firebase/functionCalls'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

// TODO Add Unit Tests
export const AuthContextProvider = ({ children, resetStore }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(await findOrCreateAuthUser(authUser))
        preloadFunctions()
      } else {
        setUser(null)
        resetStore()
      }
      setLoading(false)
    })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const signin = useCallback(async (providerName) => {
    setLoading(true)

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
    provider.setCustomParameters({
      prompt: 'select_account',
    })

    firebase.auth().signInWithRedirect(provider)
  }, [])

  const signout = useCallback(async () => {
    setLoading(true)
    firebase.auth().signOut()
    localStorage.removeItem('currentEventId')
    navigate('/')
  }, [navigate])

  const updateUser = useCallback(
    async (data) => {
      setUser(await updateAuthUser(user, data))
    },
    [user],
  )

  const resetUserFromProvider = useCallback(async () => {
    const data = pick(firebase.auth().currentUser, ['email', 'displayName', 'photoURL'])
    return updateUser(data)
  }, [updateUser])

  const value = useMemo(
    () => ({ user, loading, signin, signout, updateUser, resetUserFromProvider }),
    [user, loading, signin, signout, updateUser, resetUserFromProvider],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthContextProvider.propTypes = {
  resetStore: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
}

export const AuthProvider = inject((store) => {
  return {
    resetStore: () => store.data.reset(),
  }
})(AuthContextProvider)
