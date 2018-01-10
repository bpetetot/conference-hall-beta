const initialState = {
  talkId: undefined,
  eventId: undefined,
  submissionStep: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_SUBMITTED_EVENT':
      return { ...state, ...action.payload, submissionStep: 0 }
    case 'NEXT_SUBMISSION_STEP':
      return { ...state, submissionStep: state.submissionStep + 1 }
    case 'SUBMISSION_FINISHED':
      return initialState
    default:
      return state
  }
}
