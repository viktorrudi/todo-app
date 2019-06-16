import React, { Component, Fragment } from 'react'
import TodoApp from './components/TodoApp/TodoApp'
import { TodoProvider } from './TodoContext'

class App extends Component {
  render() {
    return (
      <Fragment>
        <TodoProvider>
          <TodoApp />
        </TodoProvider>
      </Fragment>
    )
  }
}

export default App
