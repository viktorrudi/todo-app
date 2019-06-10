import React, { Component, Fragment } from 'react'

import TodoFolders from './TodoFolders/TodoFolders'
import TodoSheet from './TodoSheet/TodoSheet'
import { findItemInState } from '../utilities/utilities'
import * as DBtodoItems from '../../database/todo-items.json'
import * as DBtodoFolders from '../../database/todo-folders.json'
import './TodoApp.scss'
// Keeping DBtodoItems in TodoApp (global) because of badges in folders

class TodoApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: DBtodoItems.default,
      folders: DBtodoFolders.default,
      // TODO: Create login feature
      // TODO: Fetch which folder ID is open and display ut in TodoItems. null = all items
      openFolder: null,
    }
  }

  handleAddTodo = newItem => {
    this.setState({
      items: [...this.state.items, newItem],
    })
  }

  handleAddFolder = newFolder => {
    this.setState({
      folders: [...this.state.folders, newFolder],
    })
  }

  handleDeleteTodo = item => {
    // Finds the related ID inside state, of clicked item
    const targeted = findItemInState(item, this.state.items)
    // Returns a new array of todolist items without the ID of the clicked item
    const newItems = this.state.items.filter(item => item.id !== targeted.id)
    // Sets new state containing the new items
    this.setState({
      items: [...newItems],
    })
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
      prevState.folders = prevState.folders.filter(prevFolder => prevFolder.id !== folder.id)
      // Finding and removing all items in that folder
      prevState.items = prevState.items.filter(prevItem => prevItem.folder !== folder.id)
      // Returning to main overview of tasks
      prevState.openFolder = null
      return prevState
    })
    // TODO: Update folders in DB
  }

  setSelectedFolder = id => {
    this.setState({
      openFolder: id,
    })
  }

  render() {
    const items = this.state.items
    const folders = this.state.folders
    const openFolder = this.state.openFolder
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
          deleteTodo={this.handleDeleteTodo}
          toggleCompletedTodo={this.handleToggleCompletedTodo}
        />
      </Fragment>
    )
  }
}

export default TodoApp
