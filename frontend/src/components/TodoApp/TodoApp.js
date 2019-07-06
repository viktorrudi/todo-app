import React, { useContext, useEffect } from 'react'
import { TodoContext } from './TodoContext'
import TodoFolders from './TodoFolders/TodoFolders'
import TodoSheet from './TodoSheet/TodoSheet'
import Loader from '../Loader/Loader'
import { AppContext } from '../../AppContext'
import './TodoApp.scss'

export default function TodoApp () {
  const todoContext = useContext(TodoContext)
  const appContext = useContext(AppContext)

  useEffect(() => {
    todoContext.setInit.folders()
    todoContext.setInit.items()
  }, [])

  return (
    <>
      {appContext.loading ? <Loader /> : null}
      <TodoFolders />
      <TodoSheet />
    </>
  )
}
