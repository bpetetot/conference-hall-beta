import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const OpenTrigger = ({
  renderTrigger,
  children,
  defaultOpen,
  withEscapeClose,
  onOpen,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const show = () => {
    setIsOpen(true)
    if (onOpen) onOpen()
  }

  const hide = () => {
    setIsOpen(false)
    if (onClose) onClose()
  }

  useEffect(() => {
    const handleKeydown = e => {
      if (e.keyCode === 27) hide()
    }

    if (withEscapeClose) {
      document.addEventListener('keydown', handleKeydown)
    }

    return () => {
      if (withEscapeClose) {
        document.removeEventListener('keydown', handleKeydown)
      }
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {renderTrigger && renderTrigger({ isOpen, show, hide })}
      {isOpen && children({ isOpen, show, hide })}
    </>
  )
}

OpenTrigger.propTypes = {
  children: PropTypes.func.isRequired,
  defaultOpen: PropTypes.bool,
  renderTrigger: PropTypes.func,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  withEscapeClose: PropTypes.bool,
}

OpenTrigger.defaultProps = {
  renderTrigger: undefined,
  defaultOpen: false,
  onOpen: undefined,
  onClose: undefined,
  withEscapeClose: true,
}

export default OpenTrigger
