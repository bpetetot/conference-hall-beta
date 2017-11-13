const initialState = []

export const toast = (id, label, type = 'default') => ({
  type: 'TOAST',
  payload: { id, label, type },
})

export default (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.payload]
    case 'REMOVE_TOAST':
      return state.filter(({ id }) => id !== action.payload.id)
    default:
      return state
  }
}
