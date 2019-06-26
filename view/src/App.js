import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import TodoApp from './components/TodoApp/TodoApp'
import Login from './components/Login'
import TodoProvider from './TodoContext'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Route path="/login" component={Login} />
        <TodoProvider>
          <Route path="/todo" component={TodoApp} />
        </TodoProvider>
      </BrowserRouter>
    )
  }
}

export default App
