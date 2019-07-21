import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import './Errors.scss'

export default function Errors ({ messages }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!visible && messages.length > 0) {
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
        messages.length = 0
      }, 4000)
    }
    if (messages.length > 2) messages.shift()
  }, [messages, visible])

  return (
    <div className="Errors__wrapper">
      {messages.map((errorMessage, index) => (
        <div
          key={index}
          className={`Errors ${visible ? 'error-visible' : 'error-hidden'}`}
        >
          <span role="img" aria-label="Error">
            😨
          </span>{' '}
          {errorMessage}
        </div>
      ))}
    </div>
  )
}

Errors.propTypes = {
  messages: PropTypes.array
}
