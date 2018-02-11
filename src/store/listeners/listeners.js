import { when } from 'k-ramel'

import * as auth from './reactions/auth'
import * as firebase from './reactions/firebase'
import * as user from './reactions/user'
import * as speakerApp from './reactions/speakerApp'

export default [
  /* app loaded */
  when('@@krml/INIT')(firebase.init),
  /* firebase actions */
  when('@@firebase/SIGNED_IN')(auth.signedIn),
  when('@@firebase/SIGNED_OUT')(auth.signedOut),
  /* authentication */
  when('@@ui/SIGN_IN')(auth.signin),
  when('@@ui/SIGN_OUT')(auth.signout),
  /* user */
  when('@@ui/FETCH_USER')(user.fetchUser),
  when('@@ui/SAVE_PROFILE')(user.saveProfile),
  /* speaker app */
  when('@@ui/ON_LOAD_SPEAKER_APP')(speakerApp.init),
  when('@@ui/ON_CHANGE_SPEAKER_APP_EVENT')(speakerApp.setCurrentEvent),
]
