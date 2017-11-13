export const getAuth = state => state.auth

export const isInitialized = state => getAuth(state).initialized

export const isAuthenticated = state => getAuth(state).authenticated
