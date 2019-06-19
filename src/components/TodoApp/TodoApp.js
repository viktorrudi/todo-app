import React, { Component, Fragment } from 'react'

import TodoFolders from './TodoFolders/TodoFolders'
import TodoSheet from './TodoSheet/TodoSheet'
import { TodoContext } from '../../TodoContext'
import './TodoApp.scss'

class TodoApp extends Component {
  // Not used for anything atm
  static contextType = TodoContext

  // handleDeleteTodo = itemID => {
  //   // Finds the related ID inside state, of clicked item
  //   const targeted = findItemInState(itemID, this.state.items)
  //   // Returns a new array of todolist items without the ID of the clicked item
  //   const newItems = this.state.items.filter(item => item.id !== targeted.id)
  //   // Sets new state containing the new items
  //   this.setState({
  //     items: [...newItems]
  //   })
  // }

  // handleUpdateTodo = (task, itemToUpdate) => {
  //   if (task === 'change_text') {
  //     this.setState(prevState => {
  //       // Updates state to contain updated todo (from OpenItem.js)
  //       const newItems = prevState.items.map(oldItem => {
  //         if (oldItem.id === itemToUpdate.id) {
  //           oldItem = itemToUpdate
  //         }
  //         return oldItem
  //       })
  //       prevState.items = newItems
  //       return prevState
  //     })
  //   }
  // }

  render () {
    return (
      <Fragment>
        <TodoFolders />
        <TodoSheet
          handleUpdateTodo={this.handleUpdateTodo}
          handleDeleteTodo={this.handleDeleteTodo}
        />
      </Fragment>
    )
  }
}

export default TodoApp
