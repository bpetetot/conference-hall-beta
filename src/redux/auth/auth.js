const initialState = {
  initialized: false,
  authenticated: false,
  uid: undefined,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FIREBASE_INITIALIZED':
      return { ...state, initialized: true }
    case 'FIREBASE_AUTHENTICATED':
      return { ...state, authenticated: action.payload }
    case 'SET_AUTHENTICATED_USER':
      return { ...state, uid: action.payload }
    default:
      return state
  }
}
