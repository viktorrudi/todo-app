import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../AppContext'
import './ForgotPassword.scss'

export default function ForgotPassword ({ setView }) {
  const [email, setEmail] = useState('')
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true)
  const { resetPassword, loginError } = useContext(AppContext)

  useEffect(() => {
    if (email.length > 5) {
      setButtonIsDisabled(false)
    } else {
      setButtonIsDisabled(true)
    }
  }, [email])

  const handleSubmit = e => {
    e.preventDefault()
    resetPassword.requestReset(email)
  }

  const type = 'Form'
  return (
    <div id="forgot-password" className={`${type}__container`}>
      <div className={`${type}__container--wrapper`}>
        <span role="img" aria-label="Login">
          🤕
        </span>
        <div className="welcome-effect">
          <h2>Forgot password</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email" />
              <input
                type="email"
                id="reset_email"
                placeholder="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <button
                disabled={buttonIsDisabled}
                className={`default-btn ${loginError ? 'error' : null}`}
                type="submit"
                onClick={handleSubmit}
              >
                Send reset email
              </button>
            </div>
          </form>
          <div className="swap-form" onClick={() => setView('login')}>
            Login instead
          </div>
        </div>
      </div>
    </div>
  )
}
