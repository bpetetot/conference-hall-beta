const initialState = {
  talkId: undefined,
  currentStep: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SUBMISSION_SELECT_TALK':
      return {
        ...state,
        talkId: action.payload.talkId,
        currentStep: 1,
      }
    case 'SUBMISSION_NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 }
    case 'SUBMISSION_RESET':
      return initialState
    default:
      return state
  }
}
