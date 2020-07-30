/* eslint-disable react/jsx-filename-extension */
import React, { useState, useEffect, useContext, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import firebase from 'firebase/app'
import pick from 'lodash/pick'

import userCrud from 'firebase/user'
import { preloadFunctions } from 'firebase/functionCalls'

const AuthContext = React.createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
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
    // TODO router.push('home')
    localStorage.removeItem('currentEventId')
  }, [])

  const value = useMemo(() => ({ user, loading, signin, signout }), [
    user,
    loading,
    signin,
    signout,
  ])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.any.isRequired,
}
