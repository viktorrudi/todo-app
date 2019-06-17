import React, { Component } from 'react'
import TodoApp from './components/TodoApp/TodoApp'
import { TodoProvider } from './TodoContext'

class App extends Component {
  render () {
    return (
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    )
  }
}

export default App
