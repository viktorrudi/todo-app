import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import { AppContext } from '../../../AppContext'

export default function RequestPassword ({ setSentToken, setEmailRequester }) {
  const [email, setEmail] = useState('')
  const [buttonIsDisabled, setButtonIsDisabled] = useState(true)
  const { resetPassword, loading, setLoading, setError } = useContext(
    AppContext
  )

  useEffect(() => {
    if (loading) {
      setButtonIsDisabled(true)
    } else if (email.length > 5) {
      setButtonIsDisabled(false)
    } else {
      setButtonIsDisabled(true)
    }
  }, [email, loading])

  const handleSubmit = async e => {
    e.preventDefault()

    // Sending email of requester back to be used for reset request
    setEmailRequester(email)

    try {
      setLoading(true)

      // Checks if email exists in DB and sends the email
      const sent = await resetPassword.requestReset(email)

      if (sent.status === 200) {
        setSentToken(true)
        setLoading(false)
      }
    } catch (err) {
      setLoading(false)
      if (err.response.status === 400) {
        return setError(err.response.data.message)
      }
      // If unhandled error:
      setError('Oops, something happened')
      console.error(err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label htmlFor="email" />
        <input
          type="email"
          id="reset_email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className="input-wrapper">
        <button
          disabled={buttonIsDisabled}
          className="default-btn"
          type="submit"
          onClick={handleSubmit}
        >
          Send reset code
        </button>
      </div>
    </form>
  )
}

RequestPassword.propTypes = {
  setSentToken: PropTypes.func,
  setEmailRequester: PropTypes.func
}
