import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Switch } from 'react-router'
import TodoApp from './components/TodoApp/TodoApp'
import Welcome from './components/Welcome/Welcome'
import TodoProvider from './components/TodoApp/TodoContext'
import AppProvider from './AppContext'

export default function App () {
  const [isAuth, setIsAuth] = useState(false)

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        isAuth ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )

  return (
    <Router>
      <Switch>
        <AppProvider>
          <Route exact path="/" component={Welcome} setIsAuth={setIsAuth} />
          <TodoProvider>
            <PrivateRoute exact path="/todo" component={TodoApp} />
          </TodoProvider>
        </AppProvider>
      </Switch>
    </Router>
  )
}
