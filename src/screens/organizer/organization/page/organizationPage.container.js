import { compose } from 'redux'
import { inject } from '@k-ramel/react'
import forRoute from 'hoc-little-router'

import { getRouterParam } from 'store/reducers/router'
import loader from 'components/loader'

import OrganizationPage from './organizationPage'

const mapStore = (store) => {
  const organizationId = getRouterParam('organizationId')(store.getState())
  const organization = store.data.organizations.get(organizationId)

  return {
    loaded: !!organization && !!organization.users,
    ...organization,
    load: () => store.dispatch('@@ui/ON_LOAD_ORGANIZATION'),
    onSelectUser: (uid) => {
      store.dispatch({ type: '@@ui/ADD_ORGANIZATION_TO_USER', payload: { uid, organizationId } })
      store.ui.modal.set({ openedModal: undefined })
    },
  }
}

export default compose(
  forRoute.absolute('ORGANIZATION_PAGE'),
  inject(mapStore),
  loader,
)(OrganizationPage)
