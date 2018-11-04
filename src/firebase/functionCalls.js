import firebase from 'firebase/app'
import { DateTime } from 'luxon'

const functions = {}

const buildFunctionWithTimezone = (functionName) => {
  const cloudFunction = firebase.functions().httpsCallable(functionName)
  const timezone = DateTime.local.zoneName

  return ({ userTimezone, ...rest }) => cloudFunction({
    ...rest,
    userTimezone: userTimezone || timezone,
  })
}

export const initFunctionCalls = () => {
  functions.submitTalk = buildFunctionWithTimezone('submitTalk')
  functions.unsubmitTalk = buildFunctionWithTimezone('unsubmitTalk')
}

export default functions
