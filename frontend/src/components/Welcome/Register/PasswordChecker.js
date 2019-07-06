import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

export default function PasswordChecker ({ password, passwordRepeat }) {
  const passwordValidation = {
    areAlike: () => {
      if (password === passwordRepeat && password.length > 0) {
        return 'fulfilled'
      }
    },
    has8Chars: () => {
      if (password.length >= 6 && passwordRepeat.length >= 6) {
        return 'fulfilled'
      }
    }
  }

  // useEffect(() => {

  // }, [password, passwordRepeat])

  return (
    <div className="password-checker">
      <ul>
        <li className={passwordValidation.has8Chars()}>
          At least 6 characters
        </li>
        <li className={passwordValidation.areAlike()}>Matching passwords</li>
      </ul>
    </div>
  )
}

PasswordChecker.propTypes = {
  password: PropTypes.string,
  passwordRepeat: PropTypes.string
}
