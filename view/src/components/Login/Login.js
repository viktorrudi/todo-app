import React, { useState } from 'react'
import './Login.scss'

export default function Login () {
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
  }

  const type = 'Login'
  return (
    <div className={type}>
      <div className={`${type}__wrapper`}>
        <span role="img">👌</span>
        <form handleSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email" />
            <input
              type="text"
              id="email"
              placeholder="email"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password" />
            <input
              type="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <div className="input-wrapper">
              <input type="submit" value="Login" />
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
