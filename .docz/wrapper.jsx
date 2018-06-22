/* eslint-disable react/prop-types */
import React from 'react'

import 'font-awesome/css/font-awesome.min.css'
import 'src/styles/themes/default.css'
import 'src/styles/components/button.css'

export default ({ children }) => (
  <div className="default-theme">
    {children}
  </div>
)
