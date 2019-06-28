import React, { Component, createContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

export const AppContext = createContext()

class AppProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      userID: '',
      token: '',
      loginError: '',
      httpStatus: 0,
      setLoggedIn: this.setLoggedIn,
      handleLogin: this.handleLogin
    }
  }

  static propTypes = {
    children: PropTypes.array
  }

  /// Actions ///

  handleLogin = (email, password) => {
    console.log('starting login with:', {
      email,
      password
    })
    const loginTimeout = setTimeout(() => {
      this.setState({ loginError: 'Request timeout', httpStatus: 408 })
    }, 2000)

    axios
      .post('http://localhost:4000/api/login/', {
        email,
        password
      })
      .then(response => {
        console.log('login successful', response)
        clearTimeout(loginTimeout)
        this.setState({
          loginError: '',
          loggedIn: response.httpStatus === 200,
          httpStatus: response.status,
          userID: response.data.data.user._id,
          token: response.data.data.token
        })
      })
      .catch(err => {
        clearTimeout(loginTimeout)
        this.setState({
          httpStatus: err.response.status,
          loginError: 'Incorrect email/password'
        })
      })
  }

  setLoggedIn = () => {
    this.setState({ loggedIn: true })
  }

  render () {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

export default AppProvider
