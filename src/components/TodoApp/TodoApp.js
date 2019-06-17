import React, { Component, Fragment } from 'react'

import TodoFolders from './TodoFolders/TodoFolders'
import TodoSheet from './TodoSheet/TodoSheet'
import { findItemInState } from '../utilities/utilities'
import { TodoContext } from '../../TodoContext'
import './TodoApp.scss'

class TodoApp extends Component {
  static contextType = TodoContext

  handleAddTodo = newItem => {
    this.setState({
      items: [...this.state.items, newItem]
    })
  }

  handleAddFolder = newFolder => {
    this.setState({
      folders: [...this.state.folders, newFolder]
    })
  }

  handleDeleteTodo = itemID => {
    // Finds the related ID inside state, of clicked item
    const targeted = findItemInState(itemID, this.state.items)
    // Returns a new array of todolist items without the ID of the clicked item
    const newItems = this.state.items.filter(item => item.id !== targeted.id)
    // Sets new state containing the new items
    this.setState({
      items: [...newItems]
    })
  }

  handleUpdateTodo = (task, itemToUpdate) => {
    if (task === 'change_text') {
      this.setState(prevState => {
        // Updates state to contain updated todo (from OpenItem.js)
        const newItems = prevState.items.map(oldItem => {
          if (oldItem.id === itemToUpdate.id) {
            oldItem = itemToUpdate
          }
          return oldItem
        })
        prevState.items = newItems
        return prevState
      })
    }
  }

  handleToggleCompletedTodo = id => {
    // Finds the related ID inside state, of clicked item
    this.setState(prevState => {
      let updatedItems = prevState.items.map(prevItem => {
        if (id === prevItem.id) {
          prevItem.completed = !prevItem.completed
        }
        return prevItem
      })
      // Updates states items with toggled completed todos
      return updatedItems
    })
  }

  handleChangeFolderName = folder => {
    this.setState(prevState => {
      let updatedFolders = prevState.folders.map(prevFolder => {
        if (folder.id === prevFolder.id) {
          prevFolder.name = folder.name
        }
        return false
      })
      return updatedFolders
    })
  }

  handleDeleteFolder = folder => {
    this.setState(prevState => {
      // Finding and removing targeted folder from state
      prevState.folders = prevState.folders.filter(
        prevFolder => prevFolder.id !== folder.id
      )
      // Finding and removing all items in that folder
      prevState.items = prevState.items.filter(
        prevItem => prevItem.folder !== folder.id
      )
      // Returning to main overview of tasks
      prevState.openFolder = null
      return prevState
    })
    // TODO: Update folders in DB
  }

  setSelectedFolder = id => {
    this.setState({
      openFolder: id
    })
  }

  render () {
    // Todocontext

    // const [itemsLib, setItems] = this.context
    // console.log(itemsLib)
    const { items, folders, openFolder } = this.context[0]
    return (
      <Fragment>
        <TodoFolders
          folders={folders}
          getSelectedFolder={this.setSelectedFolder}
          items={items}
          createFolder={this.handleAddFolder}
        />
        <TodoSheet
          items={items}
          folders={folders}
          openFolder={openFolder}
          changeFolderName={this.handleChangeFolderName}
          deleteFolder={this.handleDeleteFolder}
          newTodo={this.handleAddTodo}
          toggleCompletedTodo={this.handleToggleCompletedTodo}
          handleUpdateTodo={this.handleUpdateTodo}
          handleDeleteTodo={this.handleDeleteTodo}
        />
      </Fragment>
    )
  }
}

export default TodoApp
