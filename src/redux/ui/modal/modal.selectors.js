export const getModal = state => state.ui.modal

export const isModalOpened = state => id => getModal(state).openedModal === id
