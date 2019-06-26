import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../Welcome.scss'

export default function Register (props) {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
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
              value={userName}
              onChange={e => setUserName(e.target.value)}
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
            <div className="input-wrapper">
              <input type="submit" value="Register" />
            </div>
          </div>
        </form>
        <div className="swap-form" onClick={() => props.setView('login')}>
          I have a user
        </div>
      </div>
    </div>
  )
}

Register.propTypes = {
  setView: PropTypes.func
}
