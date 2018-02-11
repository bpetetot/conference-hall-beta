import { when } from 'k-ramel'

import * as auth from './reactions/auth'
import * as firebase from './reactions/firebase'

export default [
  when('@@krml/INIT')(firebase.init),
  when('@@firebase/SIGNED_IN')(auth.signedIn),
  when('@@firebase/SIGNED_OUT')(auth.signedOut),
  when('@@ui/SIGN_IN')(auth.signin),
  when('@@ui/SIGN_OUT')(auth.signout),
]
