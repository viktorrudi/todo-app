import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../Welcome.scss'

export default function Login (props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
  }

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
              value={userName}
              onChange={e => setUserName(e.target.value)}
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
            <div className="input-wrapper">
              <input type="submit" value="Login" />
            </div>
          </div>
        </form>
        <div className="swap-form" onClick={() => props.setView('register')}>
          I need to sign up
        </div>
      </div>
    </div>
  )
}

Login.propTypes = {
  setView: PropTypes.func
}
