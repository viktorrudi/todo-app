import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import '../Welcome.scss'
import { AppContext } from '../../../AppContext'

export default function Login (props) {
  const initialText = {
    login: 'Login ',
    loggingIn: 'Logging in...'
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginText, setLoginText] = useState(initialText.login)
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true)

  const context = useContext(AppContext)

  const handleSubmit = async e => {
    e.preventDefault()
    setLoginText(initialText.loggingIn)
    setButtonIsDisabled(true)
    await context.handleLogin(email, password)
  }

  useEffect(() => {
    if (context.httpStatus === 401) {
      setLoginText(context.loginError)
      setButtonIsDisabled(true)
    }
    if (!context.loginError) {
      setLoginText(initialText.login)
    }
    if (context.httpStatus === 200) {
      setLoginText(initialText.loggingIn)
    }
    if (email.length > 4 && password.length >= 4) {
      setButtonIsDisabled(false)
    } else {
      setButtonIsDisabled(true)
    }
  })

  const type = 'Form'
  return (
    <div id="login" className={`${type}__container`}>
      <div className={`${type}__container--wrapper`}>
        <span role="img" aria-label="Login">
          👌
        </span>
        <h2>Login</h2>
        <form handleSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email" />
            <input
              type="text"
              id="login_email"
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password" />
            <input
              type="password"
              id="login_password"
              placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <button
              disabled={buttonIsDisabled}
              className={`login-btn ${context.loginError ? 'error' : null}`}
              type="submit"
              onClick={handleSubmit}
            >
              {loginText}
            </button>
          </div>
        </form>
        <div className="swap-form" onClick={() => props.setView('register')}>
          I need to register
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setView: PropTypes.func
}
