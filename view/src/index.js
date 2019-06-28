import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'
import App from './App'
import AppProvider from './AppContext'

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById('root')
)
