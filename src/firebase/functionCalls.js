import firebase from 'firebase/app'

const functions = {}

export const initFunctionCalls = () => {
  functions.getCfpState = firebase.functions().httpsCallable('getCfpState')
  functions.submitTalk = firebase.functions().httpsCallable('submitTalk')
  functions.unsubmitTalk = firebase.functions().httpsCallable('unsubmitTalk')
}

export default functions
