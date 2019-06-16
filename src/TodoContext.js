import React, { useState, createContext } from 'react'
import * as DBtodoItems from './database/todo-items.json'
import * as DBtodoFolders from './database/todo-folders.json'

export const TodoContext = createContext()

export const TodoProvider = props => {
  const [todo, setTodo] = useState({
    items: DBtodoItems.default,
    folders: DBtodoFolders.default,
    openFolder: null,
  })
  return <TodoContext.Provider value={[todo, setTodo]}>{props.children}</TodoContext.Provider>
}
