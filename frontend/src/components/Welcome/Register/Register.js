import React, { useState, useContext, useEffect } from 'react'
import { AppContext } from '../../../AppContext'
import PropTypes from 'prop-types'
import PasswordChecker from './PasswordChecker'
import '../Welcome.scss'

export default function Register (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true)
  const context = useContext(AppContext)

  useEffect(() => {
    setButtonIsDisabled(true)
    if (
      email.length >= 6 &&
      password.length >= 6 &&
      passwordRepeat === password
    ) {
      setButtonIsDisabled(false)
    }
  }, [email, password, passwordRepeat])

  const handleSubmit = e => {
    e.preventDefault()
    context.handleRegistration(email, password)
  }

  const type = 'Form'
  return (
    <div id="register" className={`${type}__container`}>
      <div className={`${type}__container--wrapper`}>
        <span role="img" aria-label="Register">
          👋
        </span>
        <h2>Register</h2>
        <form handleSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email" />
            <input
              type="text"
              id="register_email"
              placeholder="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password" />
            <input
              type="password"
              id="register_password"
              placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password-repeat" />
            <input
              type="password"
              id="password-repeat"
              placeholder="password again"
              value={passwordRepeat}
              onChange={e => setPasswordRepeat(e.target.value)}
            />
          </div>
          <PasswordChecker
            password={password}
            passwordRepeat={passwordRepeat}
          />
          <div className="input-wrapper">
            <button
              disabled={buttonIsDisabled}
              className="register-btn"
              type="submit"
              onClick={handleSubmit}
            >
              Register
            </button>
          </div>
        </form>
        <div className="swap-form" onClick={() => props.setView('login')}>
          I already have a user
        </div>
      </div>
    </div>
  )
}

Register.propTypes = {
  setView: PropTypes.func
}
