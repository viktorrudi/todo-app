import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Switch } from 'react-router'
import TodoApp from './components/TodoApp/TodoApp'
import Welcome from './components/Welcome/Welcome'
import TodoProvider from './components/TodoApp/TodoContext'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <TodoProvider>
            <Route exact path="/todo" component={TodoApp} />
          </TodoProvider>
          <Route component={Welcome} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App
