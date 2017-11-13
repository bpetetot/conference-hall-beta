const initialState = []

export const toast = (code, label, type = 'default') => ({
  type: 'TOAST',
  payload: { code, label, type },
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.payload]
    case 'REMOVE_TOAST':
      return state.filter(({ code }) => code !== action.payload.code)
    default:
      return state
  }
}
