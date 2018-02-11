import usersData from 'redux/data/users'

export const getAuth = state => state.auth

export const isInitialized = state => getAuth(state).initialized

export const isAuthenticated = state => getAuth(state).authenticated

export const getUserId = state => getAuth(state).uid

export const getUser = state => usersData.get(getUserId(state)) || {}
