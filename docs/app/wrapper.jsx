/* eslint-disable react/prop-types */
import React from 'react'

import 'normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'src/styles/themes/default.css'
import 'src/styles/components/input.css'
import './wrapper.css'

const Wrapper = ({ children }) => <div className="default-theme">{children}</div>

export default Wrapper
