import { inject } from '@k-ramel/react'

import OrganizationForm from './organizationForm'

const mapStore = (store, { userId }) => ({
  submitting: store.ui.loaders.get().isOrganizationSaving,
  onSubmit: (data) => {
    store.dispatch({ type: '@@ui/ON_CREATE_ORGANIZATION', payload: { userId, data } })
  },
})

export default inject(mapStore)(OrganizationForm)
