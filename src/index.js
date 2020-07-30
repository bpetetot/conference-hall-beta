/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom'

import 'normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'regenerator-runtime/runtime'

import './firebase/init'

import App from './app'

ReactDOM.render(<App />, document.getElementById('root'))
