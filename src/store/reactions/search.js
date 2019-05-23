/* eslint-disable import/prefer-default-export */

export const setSearchEventsQuery = (action, store) => {
  store.ui.searchEvents.update({ query: action.payload })
}
