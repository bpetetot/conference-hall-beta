/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ReactQueryDevtools } from 'react-query-devtools'
import { QueryCache, ReactQueryCacheProvider } from 'react-query'

import 'normalize.css'
import 'font-awesome/css/font-awesome.min.css'
import 'regenerator-runtime/runtime'

import './firebase/init'

import App from './app'

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
})

ReactDOM.render(
  <BrowserRouter>
    <ReactQueryCacheProvider queryCache={queryCache}>
      <App />
      <ReactQueryDevtools />
    </ReactQueryCacheProvider>
  </BrowserRouter>,
  document.getElementById('root'),
)
