/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react'
import { inject } from '@k-ramel/react'
import PropTypes from 'prop-types'
import firebase from 'firebase/compat/app'
import pick from 'lodash/pick'
import { useNavigate } from 'react-router-dom'

import userCrud from '../../firebase/user'
import { preloadFunctions } from '../../firebase/functionCalls'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

// TODO Add Unit Tests
export function AuthContextProvider({ children, resetStore }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (authUser) => {
      if (authUser) {
        // check if user exists in database
        const userRef = await userCrud.read(authUser.uid)
        if (userRef.exists) {
          // get user info from db
          setUser(userRef.data())
        } else {
          // first connexion, add user in database
          const userData = pick(authUser, ['uid', 'displayName', 'photoURL', 'email'])
          await userCrud.create(userData)
          setUser(userData)
        }
        // preload cloud functions
        preloadFunctions()
      } else {
        setUser(null)
        resetStore()
      }
      setLoading(false)
    })
  }, [])

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
      const updatedUser = { ...user, ...data }
      setUser(updatedUser)
      return userCrud.update(updatedUser)
    },
    [user],
  )

  const resetUserFromProvider = useCallback(async () => {
    const data = pick(firebase.auth().currentUser, ['uid', 'email', 'displayName', 'photoURL'])
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
