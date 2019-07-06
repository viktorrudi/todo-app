import React, { useState, useContext } from 'react'
import { AppContext } from '../../../AppContext'
import PropTypes from 'prop-types'
import '../Welcome.scss'

export default function Register (props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const context = useContext(AppContext)

  const handleSubmit = e => {
    e.preventDefault()
    context.handleRegistration(email, password)
  }

  const passwordValidation = {
    areAlike: () => {
      if (password === passwordRepeat && password.length > 0) {
        return 'fulfilled'
      }
    },
    has8Chars: () => {
      if (password.length >= 8 && passwordRepeat.length >= 8) {
        return 'fulfilled'
      }
    }
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
          <div className="password-checker">
            <ul>
              <li className={passwordValidation.has8Chars()}>
                At least 8 characters
              </li>
              <li className={passwordValidation.areAlike()}>
                Matching passwords
              </li>
            </ul>
          </div>
          <div className="input-wrapper">
            <button
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
