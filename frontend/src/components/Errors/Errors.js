import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../AppContext'
import './Errors.scss'

export default function Errors () {
  const [visible, setVisible] = useState(false)
  const { errors } = useContext(AppContext)

  useEffect(() => {
    if (!visible && errors.length > 0) {
      setVisible(true)
      setTimeout(() => {
        setVisible(false)
        errors.length = 0
      }, 4000)
    }
  }, [errors, visible])

  return (
    <div className="Errors__wrapper">
      {errors.map(error => (
        <div className={`Errors ${visible ? 'error-visible' : 'error-hidden'}`}>
          <span role="img" aria-label="Error">😨</span> {error}
        </div>
      ))}
    </div>
  )
}
