import React, { Component, Fragment } from 'react'
import AddTodo from './AddTodo/AddTodo'
import TodoItems from './TodoItems/TodoItems'
import TodoFolders from './TodoFolders/TodoFolders'
import { findItemInState } from '../utilities/utilities'
import * as DBtodoItems from '../../database/todo-items.json'
import * as DBtodoFolders from '../../database/todo-folders.json'

//TODO: Consider setting folders and items as context instead

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: DBtodoItems.default,
      folders: DBtodoFolders.default,
      // TODO: Create login feature
      loggedIn: true,
      // TODO: Fetch which folder ID is open and display ut in TodoItems. null = all items
      openFolder: null,
    }
    this.handleAddTodo = this.handleAddTodo.bind(this)
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
    this.handleToggleCompletedTodo = this.handleToggleCompletedTodo.bind(this)
    this.setSelectedFolder = this.setSelectedFolder.bind(this)
  }

  handleAddTodo(newItem) {
    this.setState({
      items: [...this.state.items, newItem],
    })
  }

  handleDeleteTodo(item) {
    // Finds the related ID inside state, of clicked item
    const targeted = findItemInState(item, this.state.items)
    // Returns a new array of todolist items without the ID of the clicked item
    const newItems = this.state.items.filter(item => item.id !== targeted.id)
    // Sets new state containing the new items
    this.setState({
      items: [...newItems],
    })
  }

  handleToggleCompletedTodo(id) {
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

  setSelectedFolder(id) {
    // Lifing state up from Folder selection - to set the ID of the clicked on folder
    this.setState({
      openFolder: id,
    })
  }

  render() {
    const items = this.state.items
    return (
      <Fragment>
        <TodoFolders
          getSelectedFolder={this.setSelectedFolder}
          itemsCount={this.state.items.length}
        />
        <div className="TodoSheet">
          <AddTodo newTodo={this.handleAddTodo} items={items} />
          <TodoItems
            items={items}
            deleteTodo={this.handleDeleteTodo}
            toggleCompletedTodo={this.handleToggleCompletedTodo}
            openFolder={this.state.openFolder}
          />
        </div>
      </Fragment>
    )
  }
}

export default Todo
