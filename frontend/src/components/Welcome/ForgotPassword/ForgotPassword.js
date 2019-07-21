import React, { useState } from 'react'
import PropTypes from 'prop-types'
import RequestPassword from './RequestPassword'
import ResetPassword from './ResetPassword'
import './ForgotPassword.scss'

export default function ForgotPassword ({ setView }) {
  const [sentToken, setSentToken] = useState(false)
  const [emailRequester, setEmailRequester] = useState('')

  const type = 'Form'
  return (
    <div id="forgot-password" className={`${type}__container`}>
      <div className={`${type}__container--wrapper`}>
        <span role="img" aria-label="forgot password">
          {sentToken ? '📨' : '🤕'}
        </span>
        <div className="welcome-effect">
          <h2>{sentToken ? 'Check your email' : 'Reset password'}</h2>
          {sentToken ? null : (
            <RequestPassword
              setSentToken={setSentToken}
              setEmailRequester={setEmailRequester}
            />
          )}
          {sentToken ? <ResetPassword email={emailRequester} /> : null}
          <div
            className="swap-form"
            onClick={() => {
              setView('login')
              setSentToken(false)
            }}
          >
            Login instead
          </div>
        </div>
      </div>
    </div>
  )
}

ForgotPassword.propTypes = {
  setView: PropTypes.func
}
