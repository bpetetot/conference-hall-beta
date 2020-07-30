import { when } from 'k-ramel'

import betaAccess from 'firebase/betaAccess'
import userCrud from 'firebase/user'

export default [
  when('@@ui/CHECK_BETA_ACCESS_KEY')(async (action, store) => {
    const { uid, key } = action.payload
    const accessRef = await betaAccess.read(key)

    if (accessRef.exists) {
      await userCrud.update({ uid, betaAccess: key })
      store.data.users.update({ uid, betaAccess: key })
      store.ui.beta.reset()

      // redirect to the next url if exists
      store.dispatch('@@router/REDIRECT_TO_NEXT_URL')
    } else {
      store.ui.beta.set({ error: 'Sorry, invalid beta access key.' })
    }
  }),
]
