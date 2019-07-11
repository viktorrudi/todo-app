import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'

export const AppContext = React.createContext()

const AppProvider = props => {
  const API_URL = 'http://localhost:4000/api'
  const ACTION_TIMEOUT = 7000

  // Redirect to login if not logged in
  useEffect(() => {
    if (!Cookies.get('x-access-token') && !Cookies.get('x-user-id')) {
      props.history.push('/')
    }
  }, [])

  // Initial state
  const [state, setState] = useState({
    loggedIn: false,
    errors: [],
    loading: false
  })

  const [action, setAction] = useState({
    login: async (email, password) => {
      console.log('starting login (frontend)')

      const loginTimeout = setTimeout(() => {
        setState({
          errors: [
            state.errors,
            'Sorry, it took to long to log you in. Please try again later.'
          ],
          loading: false
        })
      }, ACTION_TIMEOUT)

      setState({
        ...state,
        loading: true,
        errors: []
      })

      try {
        const { data, status } = await axios.post(API_URL + '/login', {
          email,
          password
        })
        clearTimeout(loginTimeout)
        // Cookie setup
        console.log('login succes. response:', data)
        Cookies.set('x-access-token', data.data.token, { expires: 7 })
        Cookies.set('x-user-id', data.data.user._id, { expires: 7 })
        console.log('cookes set')

        setState({
          ...state,
          loggedIn: status === 200,
          errors: [],
          loading: false
        })
        props.history.push('/todo')
      } catch (err) {
        clearTimeout(loginTimeout)
        setState({
          ...state,
          errors: 'Incorrect email/password',
          loading: false
        })
      }
    },

    logOut: () => {
      setState({
        ...state,
        loggedIn: false,
        loading: false,
        errors: []
      })
      Cookies.remove('x-access-token')
      Cookies.remove('x-user-id')
      props.history.push('/')
    },

    registration: async (email, password) => {
      const registerTimeout = setTimeout(() => {
        setState({
          errors: [
            ...this.state.errors,
            'Sorry, it took to long to register you. Please try again later.'
          ],
          loading: false
        })
      }, ACTION_TIMEOUT)

      setState({
        ...state,
        loading: true,
        errors: []
      })
      try {
        const { emailInRegister, passwordInRegister } = await axios.post(
          API_URL + '/register',
          {
            email,
            password
          }
        )
        if (emailInRegister && passwordInRegister) {
          clearTimeout(registerTimeout)
          // Login after registering with data received from API
          this.login(emailInRegister, passwordInRegister)
        }
      } catch (err) {
        switch (err.status) {
          case 409:
            clearTimeout(registerTimeout)
            setState({
              errors: [...state.errors, err.message],
              loading: false
            })
            break
          default:
            clearTimeout(registerTimeout)
            setState({
              errors: [
                ...state.errors,
                'Sorry, something is not working properly right now.'
              ],
              loading: false
            })
            break
        }
      }
    }
  })

  return (
    <AppContext.Provider
      value={{
        data: state,
        action: action
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}

AppProvider.propTypes = {
  children: PropTypes.array,
  history: PropTypes.object
}

export default withRouter(AppProvider)
