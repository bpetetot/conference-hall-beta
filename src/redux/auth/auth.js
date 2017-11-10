const initialState = {
  initialized: false,
  authenticated: false,
  user: undefined,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FIREBASE_SIGNIN':
      return { initialized: true, authenticated: true, user: action.payload }
    case 'FIREBASE_SIGNOUT':
      return { initialized: true, authenticated: false, user: undefined }
    default:
      return state
  }
}
