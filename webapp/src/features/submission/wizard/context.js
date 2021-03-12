/* eslint-disable react/jsx-filename-extension */
import React, { useState, useContext, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useParams } from 'react-router'

const WizardContext = React.createContext()

export const useWizard = () => useContext(WizardContext)

export const WizardProvider = ({ children }) => {
  const navigate = useNavigate()
  const { eventId } = useParams()
  const [step, setStep] = useState(1)

  const nextStep = useCallback(() => {
    setStep(step + 1)
  }, [step])

  const resetWizard = useCallback(() => {
    navigate(`/speaker/event/${eventId}/submission`)
  }, [navigate, eventId])

  const value = useMemo(() => ({ step, nextStep, resetWizard }), [step, nextStep, resetWizard])

  return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
}

WizardProvider.propTypes = {
  children: PropTypes.any.isRequired,
}
