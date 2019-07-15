import React, { useContext, useEffect } from 'react'
import { TodoContext } from './TodoContext'
import Sidebar from './Sidebar/Sidebar'
import TodoSheet from './TodoSheet/TodoSheet'
import Loader from '../Loader/Loader'
import Errors from '../Errors/Errors'
import { AppContext } from '../../AppContext'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import './TodoApp.scss'

export default function TodoApp () {
  const todoContext = useContext(TodoContext)
  const appContext = useContext(AppContext)

  useEffect(() => {
    // FIXME: Forces a reload after login/registration so cookies can be used to talk to API
    if (!window.location.hash) {
      window.location = window.location + '#👌'
      window.location.reload()
    }

    todoContext.setInit.folders()
    todoContext.setInit.items()
  }, [todoContext.setInit])

  return (
    <DndProvider backend={HTML5Backend}>
      {todoContext.errors ? <Errors messages={todoContext.errors} /> : null}
      {appContext.loading ? <Loader /> : null}
      <Sidebar />
      <TodoSheet />
    </DndProvider>
  )
}
