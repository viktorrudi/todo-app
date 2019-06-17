import React, { useState, createContext } from 'react'
import PropTypes from 'prop-types'
// import todoReducer from './reducers'
import * as DBtodoItems from './database/todo-items.json'
import * as DBtodoFolders from './database/todo-folders.json'

export const TodoContext = createContext()

export const TodoProvider = props => {
  const addTodoItem = item => {
    console.log('addtodo', item)
  }

  const [todo, setTodo] = useState({
    items: DBtodoItems.default,
    folders: DBtodoFolders.default,
    openFolder: null,
    addTodoItem: addTodoItem
  })

  return (
    <TodoContext.Provider value={[todo, setTodo]}>
      {props.children}
    </TodoContext.Provider>
  )
}

TodoProvider.propTypes = {
  children: PropTypes.object
}
