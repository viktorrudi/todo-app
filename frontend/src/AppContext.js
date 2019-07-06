import React, { Component, createContext } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'

export const AppContext = createContext()

// function AppProvider({history, children}) {
//   const [loggedIn, setLoggedIn] = useState(false)
//   const [userID, setUserID] = useState('')
//   const [token, setToken] = useState(Cookies.get('x-access-token'))
//   const [loginError, setLoginError] = useState('')
//   const [httpStatus, setHttpStatus] = useState(0)

// }

class AppProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loggedIn: false,
      loginError: '',
      httpStatus: 0,
      setLoggedIn: this.setLoggedIn,
      handleLogin: this.handleLogin,
      handleRegistration: this.handleRegistration,
      logOut: this.logOut
    }
  }

  static propTypes = {
    children: PropTypes.array
  }

  /// Actions ///

  handleLogin = (email, password) => {
    // const loginTimeout = setTimeout(() => {
    //   this.setState({ loginError: 'Request timeout', httpStatus: 408 })
    // }, 2000)

    axios
      .post('http://localhost:4000/api/login/', {
        email,
        password
      })
      .then(response => {
        console.log('login successful', response)

        // Set token in cookies
        Cookies.set('x-access-token', response.data.data.token)
        Cookies.set('x-user-id', response.data.data.user._id)

        // clearTimeout(loginTimeout)
        this.setState({
          loginError: '',
          loggedIn: response.status === 200,
          httpStatus: response.status
        })

        console.log('state set (appcontext)', this.state)
        this.props.history.push('/todo')
      })
      .catch(err => {
        console.log('handleLogin catch', err)
        // clearTimeout(loginTimeout)
        this.setState({
          httpStatus: err.response.status,
          loginError: 'Incorrect email/password'
        })
        throw Error(err)
      })
  }

  handleRegistration = (email, password) => {
    console.log('starting frontin registration with: ', email, password)
    axios
      .post('http://localhost:4000/api/register/', {
        email,
        password
      })
      .then(() => {
        console.log('frontend login after reg', email, password)
        this.handleLogin(email, password)
      })
      .catch(err => {
        throw new Error(err)
      })
  }

  setLoggedIn = () => {
    this.setState({ loggedIn: true })
  }

  logOut = () => {
    this.setState({
      loggedIn: false,
      userID: '',
      // token: '',
      loginError: '',
      httpStatus: 0
    })
    Cookies.remove('x-access-token')
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
