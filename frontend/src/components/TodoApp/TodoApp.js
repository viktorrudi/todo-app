import React, { useContext, useEffect } from 'react'
import { TodoContext } from './TodoContext'
import Sidebar from './Sidebar/Sidebar'
import TodoSheet from './TodoSheet/TodoSheet'
import Loader from '../Loader/Loader'
import Errors from '../Errors/Errors'
import { AppContext } from '../../AppContext'
import './TodoApp.scss'

export default function TodoApp () {
  const todoContext = useContext(TodoContext)
  const appContext = useContext(AppContext)

  useEffect(() => {
    todoContext.setInit.folders()
    todoContext.setInit.items()
  }, [todoContext.setInit])

  return (
    <>
      {todoContext.errors ? <Errors messages={todoContext.errors} /> : null}
      {appContext.loading ? <Loader /> : null}
      <Sidebar />
      <TodoSheet />
    </>
  )
}
