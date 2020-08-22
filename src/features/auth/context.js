/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react'
import { inject } from '@k-ramel/react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import pick from 'lodash/pick'

import userCrud from 'firebase/user'
import { preloadFunctions } from 'firebase/functionCalls'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

// TODO Add Unit Tests
export const AuthContextProvider = ({ children, resetStore, goToHome }) => {
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

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
  }, [resetStore])

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
    goToHome()
    localStorage.removeItem('currentEventId')
  }, [goToHome])

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
  goToHome: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
}

export const AuthProvider = inject((store, props, { router }) => {
  return {
    resetStore: () => store.data.reset(),
    goToHome: () => router.push('home'),
  }
})(AuthContextProvider)
