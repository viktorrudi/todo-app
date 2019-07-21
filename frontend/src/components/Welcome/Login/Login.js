import React, { useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '../../../AppContext'
import { FaGithub } from 'react-icons/fa'
import '../Welcome.scss'

export default function Login ({ setView }) {
  const initialText = {
    login: 'Login ',
    loggingIn: 'Logging in...'
  }
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginText, setLoginText] = useState(initialText.login)
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true)

  const context = useContext(AppContext)

  const handleSubmit = e => {
    e.preventDefault()
    setLoginText(initialText.loggingIn)
    setButtonIsDisabled(true)
    context.handleLogin(email, password)
  }

  useEffect(() => {
    if (email.length > 4 && password.length >= 4) {
      setButtonIsDisabled(false)
    } else {
      setButtonIsDisabled(true)
    }
    if (context.errors.length > 0) {
      setLoginText(initialText.login)
      setButtonIsDisabled(false)
    }
  }, [email, password, context.errors, initialText.login])

  const type = 'Form'
  return (
    <div id="login" className={`${type}__container`}>
      <div className={`${type}__container--wrapper`}>
        <span role="img" aria-label="Login">
          👌
        </span>
        <div className="welcome-effect">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email" />
              <input
                type="email"
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
            <div
              className="swap-form"
              onClick={() => setView('forgot-password')}
              style={{ textAlign: 'right' }}
            >
              I forgot my password
            </div>
            <div className="input-wrapper">
              <button
                disabled={buttonIsDisabled}
                className={`default-btn ${context.loginError ? 'error' : null}`}
                type="submit"
                onClick={handleSubmit}
              >
                {loginText}
              </button>
            </div>
          </form>
          <div className="swap-form" onClick={() => setView('register')}>
            I need to register
          </div>
          <div className="about-app">
            <a href="https://github.com/viktorrudi/todo-app" target="_blank">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setView: PropTypes.func
}
