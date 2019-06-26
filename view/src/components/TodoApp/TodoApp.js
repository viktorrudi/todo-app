import React, { useContext } from 'react'
import { TodoContext } from '../../TodoContext'
import TodoFolders from './TodoFolders/TodoFolders'
import TodoSheet from './TodoSheet/TodoSheet'
import AppAlerts from './AppAlerts/AppAlerts'
import Loader from '../Loader/Loader'
import './TodoApp.scss'

export default function TodoApp () {
  const context = useContext(TodoContext)

  if (context.loaded === 2) {
    var loaded = true
  }

  return (
    <>
      {// If loaded, display folders and items
        loaded ? (
        <>
          {context.errors ? <AppAlerts permanent={false} /> : null}
          <TodoFolders />
          <TodoSheet />
        </>
        ) : (
        <>
          <Loader loaded={loaded} />
          {context.errors ? <AppAlerts permanent={true} /> : null}
        </>
        )}
    </>
  )
}
