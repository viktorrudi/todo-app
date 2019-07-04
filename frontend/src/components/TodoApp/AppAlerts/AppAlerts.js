import React, { useContext, useState, useEffect } from 'react'
import { TodoContext } from '../TodoContext'
import './AppAlerts.scss'

export default function AppAlerts (props) {
  const context = useContext(TodoContext)

  const [showError, setShowError] = useState(false)
  const [errorMsgs, setErrorMsgs] = useState([])

  // Only update if state of errors changes
  useEffect(() => {
    if (context.errors.length > 0) {
      const messages = context.errors.filter(error => {
        return error.message
      })

      // Show errors if they exist
      setShowError(true)
      //
      setErrorMsgs(messages)
    }
  }, [context.errors])

  // Remove message after 5 seconds
  if (showError && !props.permanent) {
    setTimeout(() => {
      setShowError(false)
    }, 5000)
  }

  const type = 'AppAlerts'
  const visibility = showError ? 'open' : 'closed'
  console.error('AppAlerts.js error:', errorMsgs)
  return (
    <div className={`${type} ${visibility}`}>
      {/* {errorMsgs.map(errorMessage => {
        const { response } = errorMessage.message
        const { message } = errorMessage.message
        const status = response.status || 'status unknown'
        const data = response.data || 'could not fetch data'
        return (
          <p>
            <small>
              {status}: {data}
            </small>
            <span role="img" aria-label="Error">
              😱
            </span>
            {message}
            <span role="img" aria-label="Error">
              😱
            </span>
          </p>
        )
      })} */}
    </div>
  )
}
