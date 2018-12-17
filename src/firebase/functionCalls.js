import firebase from 'firebase/app'

const functions = {}

const buildFunctionWithTimezone = (functionName) => {
  const cloudFunction = firebase.functions().httpsCallable(functionName)
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions()

  return ({ userTimezone, ...rest }) => cloudFunction({
    ...rest,
    userTimezone: userTimezone || timeZone,
  })
}

export const initFunctionCalls = () => {
  functions.submitTalk = buildFunctionWithTimezone('submitTalk')
  functions.unsubmitTalk = buildFunctionWithTimezone('unsubmitTalk')
}

/**
 * Cloud function can be long to start due to cold-start,
 * so we call them once when connecting
 */
export const preloadFunctions = () => {
  functions.submitTalk({ initialize: true })
  functions.unsubmitTalk({ initialize: true })
}

export default functions
