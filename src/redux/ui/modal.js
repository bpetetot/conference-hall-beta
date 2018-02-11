import { simpleObject } from 'k-ramel'

const defaultData = {
  openedModal: undefined,
}

export default simpleObject({ defaultData })

/*
const initialState = {
  openedModal: undefined,
}

export const openModal = id => ({ type: 'OPEN_MODAL', payload: id })

export const closeModal = () => ({ type: 'CLOSE_MODAL' })

export default (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { openedModal: action.payload }
    case 'CLOSE_MODAL':
      return { openedModal: undefined }
    default:
      return state
  }
}
*/
