export const getAuth = state => state.auth

export const getUser = state => getAuth(state).user || {}

export const isInitialized = state => getAuth(state).initialized

export const isAuthenticated = state => getAuth(state).authenticated
