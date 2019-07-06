import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Switch } from 'react-router'
import TodoApp from './components/TodoApp/TodoApp'
import Welcome from './components/Welcome/Welcome'
import TodoProvider from './components/TodoApp/TodoContext'
import AppProvider, { AppContext } from './AppContext'

export default function App () {
  const context = useContext(AppContext)

  // TODO: Set up private route to function
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        context.loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  )

  return (
    <>
      <Router>
        <Switch>
          <AppProvider>
            <Route exact path="/" component={Welcome} />
            <TodoProvider>
              <Route exact path="/todo" component={TodoApp} />
              {/* <PrivateRoute exact path="/todo" component={TodoApp} /> */}
            </TodoProvider>
          </AppProvider>
        </Switch>
      </Router>
    </>
  )
}
