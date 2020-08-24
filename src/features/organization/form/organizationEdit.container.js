import { compose } from 'redux'
import { inject } from '@k-ramel/react'

import loader from 'components/loader'

import OrganizationForm from './organizationForm'

const mapStore = (store, { organizationId }) => {
  const organization = store.data.organizations.get(organizationId)
  return {
    loaded: !!organization,
    initialValues: organization,
    submitting: store.ui.loaders.get().isOrganizationSaving,
    onSubmit: (payload) => {
      store.dispatch({ type: '@@ui/ON_UPDATE_ORGANIZATION', payload })
    },
    load: () => store.dispatch({ type: '@@ui/ON_LOAD_ORGANIZATION', payload: { organizationId } }),
  }
}

export default compose(inject(mapStore), loader)(OrganizationForm)
