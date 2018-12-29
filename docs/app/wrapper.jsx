/* eslint-disable react/prop-types */
import React from 'react'

import 'src/styles/themes/default.css'
import './wrapper.css'

const Wrapper = ({ children }) => (
  <div className="default-theme">
    {children}
  </div>
)

export default Wrapper
