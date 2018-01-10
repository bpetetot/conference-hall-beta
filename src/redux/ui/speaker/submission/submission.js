const initialState = {
  talkId: undefined,
  update: false,
  currentStep: 0,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_TALK_TO_SUBMIT':
      return { ...state, talkId: action.payload.talkId, currentStep: 1 }
    case 'SET_TALK_TO_SUBMIT_UPDATE':
      return {
        ...state,
        talkId: action.payload.talkId,
        currentStep: 1,
        update: true,
      }
    case 'SUBMISSION_NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 }
    case 'RESET_SUBMISSION':
      return initialState
    default:
      return state
  }
}
