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

  static propTypes = {
    children: PropTypes.array
  }

  componentDidMount () {
    // Redirect to login if not logged in
    if (!Cookies.get('x-access-token') && !Cookies.get('x-user-id')) {
      this.props.history.push('/')
    }
  }

  /// Actions ///

  handleLogin = (email, password) => {
    const loginTimeout = setTimeout(() => {
      this.setState({
        errors: [
          ...this.state.errors,
          'Sorry, it took to long to log you in. Please try again later.'
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

        console.log('state set (appcontext)', this.state)
        this.props.history.push('/todo')
      })
      .catch(err => {
        console.log('handleLogin catch', err)
        clearTimeout(loginTimeout)
        this.setState({
          errors: [...this.state.errors, 'Incorrect email/password'],
          loading: false
        })
      })
  }

  handleRegistration = (email, password) => {
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
      .catch(err => {
        switch (err.response) {
          case undefined:
            clearTimeout(registerTimeout)
            this.setState({
              errors: [
                ...this.state.errors,
                'Sorry, something is not working properly right now. DB could be offline.'
              ],
              loading: false
            })
            break
          case 400:
            clearTimeout(registerTimeout)
            this.setState({
              errors: [...this.state.errors, 'User already exists!'],
              loading: false
            })
            break
          default:
            break
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

  render () {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default withRouter(AppProvider)
