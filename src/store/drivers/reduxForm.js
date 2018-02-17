import {
  setSubmitSucceeded,
  getFormValues,
  setSubmitFailed,
  startSubmit,
  stopSubmit,
  isSubmitting,
} from 'redux-form'

const asyncSubmit = (name, dispatch, getState) => async (callback, ...args) => {
  dispatch(startSubmit(name))
  const response = await callback(...args)
  if (isSubmitting(name)(getState())) dispatch(stopSubmit(name))
  return response
}

export default ({ dispatch, getState }) => name => ({
  getFormValues: () => getFormValues(name, state => state.form)(getState()),
  setSubmitFailed: (...fields) => dispatch(setSubmitFailed(name, ...fields)),
  setSubmitSucceeded: () => dispatch(setSubmitSucceeded(name)),
  startSubmit: () => dispatch(startSubmit(name)),
  stopSubmit: errors => dispatch(stopSubmit(name, errors)),
  asyncSubmit: (callback, ...options) =>
    asyncSubmit(name, dispatch, getState)(callback, ...options),
})
