const initialState = {
  initialized: false,
  authenticated: false,
  uid: undefined,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case 'FIREBASE/INITIALIZED':
      return { ...state, initialized: true }
    case 'FIREBASE/AUTHENTICATED':
      return { ...state, authenticated: action.payload }
    case 'FIREBASE/SET_AUTH_UID':
      return { ...state, uid: action.payload }
    default:
      return state
  }
}
