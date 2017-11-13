const initialState = {
  initialized: false,
  authenticated: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FIREBASE_INITIALIZED':
      return { ...state, initialized: true }
    case 'FIREBASE_AUTHENTICATED':
      return { ...state, authenticated: action.payload }
    default:
      return state
  }
}
