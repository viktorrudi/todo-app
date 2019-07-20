import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import PasswordChecker from '../Register/PasswordChecker'
import { AppContext } from '../../../AppContext'

export default function ResetPassword ({ email }) {
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true)
  const { resetPassword } = useContext(AppContext)

  useEffect(() => {
    setButtonIsDisabled(true)
    if (
      token.length > 0 &&
      password.length >= 6 &&
      passwordRepeat === password
    ) {
      setButtonIsDisabled(false)
    }
  }, [token, password, passwordRepeat])

  const handleSubmit = e => {
    e.preventDefault()
    resetPassword.setNewPassword(token, email, password)
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="email" />
        <input
          autoComplete="off"
          type="text"
          id="reset_token"
          placeholder="reset code"
          value={token}
          onChange={e => setToken(e.target.value)}
        />

        <input
          type="password"
          id="newPassword"
          placeholder="new password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <input
          type="password"
          id="newPasswordAgain"
          placeholder="new password again"
          value={passwordRepeat}
          onChange={e => setPasswordRepeat(e.target.value)}
        />
      </div>
      <PasswordChecker
        password={password}
        passwordRepeat={passwordRepeat}
        setButtonIsDisabled={setButtonIsDisabled}
      />
      <div className="input-wrapper">
        <button
          disabled={buttonIsDisabled}
          className="default-btn"
          type="submit"
          onClick={handleSubmit}
        >
          Reset password and login
        </button>
      </div>
    </form>
  )
}

ResetPassword.propTypes = {
  email: PropTypes.string
}
