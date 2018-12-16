import { when } from 'k-ramel'

import { redirectToNextUrl } from 'helpers/redirect'
import betaAccess from 'firebase/betaAccess'
import userCrud from 'firebase/user'

export default [
  when('@@ui/CHECK_BETA_ACCESS_KEY')(async (action, store, { router }) => {
    const key = action.payload
    const accessRef = await betaAccess.read(key)

    if (accessRef.exists) {
      const { uid } = store.auth.get()
      await userCrud.update({ uid, betaAccess: key })
      store.data.users.update({ uid, betaAccess: key })
      store.ui.beta.reset()

      // redirect to the next url if exists
      redirectToNextUrl(router)
    } else {
      store.ui.beta.set({ error: 'Sorry, invalid beta access key.' })
    }
  }),
]
