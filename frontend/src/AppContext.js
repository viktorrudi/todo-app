import React, { Component, createContext } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'

export const AppContext = createContext()

class AppProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      errors: [],
      loading: false,
      handleLogin: this.handleLogin,
      handleRegistration: this.handleRegistration,
      logOut: this.logOut
    }
  }

  componentDidMount () {
    // Redirect to login page if user isn't logged in
    if (!Cookies.get('x-access-token') || !Cookies.get('x-user-id')) {
      Cookies.remove('x-access-token')
      Cookies.remove('x-user-id')
      this.props.history.push('/')
    }
  }

  /// Actions ///

  handleLogin = (email, password) => {
    const loginTimeout = setTimeout(() => {
      this.setState({
        errors: [
          ...this.state.errors,
          'Sorry, it took too long to log you in. Please try again later.'
        ],
        loading: false
      })
    }, 7000)

    this.setState({ loading: true })
    axios
      .post('http://localhost:4000/api/login/', {
        email,
        password
      })
      .then(response => {
        console.log('login successful', response)

        // Set token and userID in cookies. Expires in 7 days
        Cookies.set('x-access-token', response.data.data.token, { expires: 7 })
        Cookies.set('x-user-id', response.data.data.user._id, { expires: 7 })

        clearTimeout(loginTimeout)

        this.setState({
          errors: [],
          loggedIn: response.status === 200,
          loading: false
        })

        // Cookies set. Redirecting to todo route (runs TodoApp.js)
        this.props.history.push('/todo')
      })

      .catch(({ message, response }) => {
        // Check if DB is online
        if (message === 'Network Error') {
          clearTimeout(loginTimeout)
          this.setState({
            errors: [
              ...this.state.errors,
              'Sorry, something is not working properly right now. DB could be offline.'
            ],
            loading: false
          })
          return
        }
        // Incorrect email/password
        if (response.status === 401) {
          clearTimeout(loginTimeout)
          this.setState({
            errors: [...this.state.errors, response.data.message],
            loading: false
          })
        }
      })
  }

  handleRegistration = (email, password) => {
    console.log('starting reg with', email, password)
    const registerTimeout = setTimeout(() => {
      this.setState({
        errors: [
          ...this.state.errors,
          'Sorry, it took to long to register you. Please try again later.'
        ],
        loading: false
      })
    }, 7000)

    this.setState({ loading: true })
    axios
      .post('http://localhost:4000/api/register/', {
        email,
        password
      })
      .then(() => {
        clearTimeout(registerTimeout)
        // Login after registration
        this.handleLogin(email, password)
      })
      .catch(({ message, response }) => {
        // Check if DB is online
        if (message === 'Network Error') {
          clearTimeout(registerTimeout)
          this.setState({
            errors: [
              ...this.state.errors,
              'Sorry, something is not working properly right now. DB could be offline.'
            ],
            loading: false
          })
          return
        }
        // If user already exists
        if (response.status === 409) {
          clearTimeout(registerTimeout)
          this.setState({
            errors: [...this.state.errors, response.data.message],
            loading: false
          })
        }
      })
  }

  logOut = () => {
    this.setState({
      loggedIn: false,
      errors: [],
      loading: false
    })
    Cookies.remove('x-access-token')
    Cookies.remove('x-user-id')
    this.props.history.push('/')
  }

  static propTypes = {
    children: PropTypes.array,
    history: PropTypes.object
  }

  render () {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default withRouter(AppProvider)
