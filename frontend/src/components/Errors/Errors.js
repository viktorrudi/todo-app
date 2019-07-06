import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext'
import './Errors.scss'

export default function Errors () {
  const [visible, setVisible] = useState(false)
  const context = useContext(AppContext)

  useEffect(() => {
    if (!visible && context.errors.length > 0) {
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
      }, 3000)
    }
  }, [context.errors])

  return (
    <div className={`Errors ${visible ? 'error-visible' : 'error-hidden'}`}>
      {context.errors.map(error => (
        <p>
          {/* <span className={visible ? 'error-visible' : 'error-hidden'}> */}
          ERROR: {error}
        </p>
      ))}
    </div>
  )
}
