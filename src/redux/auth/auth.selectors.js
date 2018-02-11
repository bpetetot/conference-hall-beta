export const getAuth = state => state.auth

export const isInitialized = state => getAuth(state).initialized

export const isAuthenticated = state => getAuth(state).authenticated

export const getUserId = state => getAuth(state).uid

export const getUser = store => store.data.users.get(getUserId(store.getState())) || {}
