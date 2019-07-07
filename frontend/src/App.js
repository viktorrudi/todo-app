import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Switch } from 'react-router'
import TodoApp from './components/TodoApp/TodoApp'
import Welcome from './components/Welcome/Welcome'
import TodoProvider from './components/TodoApp/TodoContext'
import AppProvider from './AppContext'

export default function App () {
  return (
    <>
      <Router>
        <Switch>
          <AppProvider>
            <Route exact path="/" component={Welcome} />
            <TodoProvider>
              <Route exact path="/todo" component={TodoApp} />
            </TodoProvider>
          </AppProvider>
        </Switch>
      </Router>
    </>
  )
}
