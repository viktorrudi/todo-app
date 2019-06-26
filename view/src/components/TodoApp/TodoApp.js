import React, { Fragment, useContext } from 'react'
import { TodoContext } from '../../TodoContext'
import TodoFolders from './TodoFolders/TodoFolders'
import TodoSheet from './TodoSheet/TodoSheet'
import './TodoApp.scss'

export default function TodoApp () {
  const context = useContext(TodoContext)

  if (context.loaded === 2) {
    var loaded = true
  }
  return (
    <Fragment>
      {loaded ? (
        <Fragment>
          <TodoFolders />
          <TodoSheet />
        </Fragment>
      ) : (
        // TODO: create spinner and give it a bit of delay
        <h1>Loadaing...</h1>
      )}
    </Fragment>
  )
}
