/* eslint-disable react/jsx-filename-extension, react/prop-types */
import React from 'react'
import Modal from './modal.container'

export default id => Component => ({ modalId, children, ...rest }) => (
  <Modal id={id || modalId}>
    <Component {...rest} />
  </Modal>
)
