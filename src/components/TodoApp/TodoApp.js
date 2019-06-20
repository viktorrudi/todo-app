import React, { Fragment } from 'react'

import TodoFolders from './TodoFolders/TodoFolders'
import TodoSheet from './TodoSheet/TodoSheet'
import './TodoApp.scss'

export default function TodoApp () {
  return (
    <Fragment>
      <TodoFolders />
      <TodoSheet />
    </Fragment>
  )
}
