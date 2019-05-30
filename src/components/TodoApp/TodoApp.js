import React, { Component, Fragment } from 'react'
import AddTodo from './AddTodo/AddTodo'
import TodoItems from './TodoItems/TodoItems'
import TodoFolders from './TodoFolders/TodoFolders'
import { findItemInState } from '../utilities/utilities'
import * as data from '../../database/todo-items.json'

class Todo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: data.default,
    }
    this.handleAddTodo = this.handleAddTodo.bind(this)
    this.handleDeleteTodo = this.handleDeleteTodo.bind(this)
    this.handleToggleCompletedTodo = this.handleToggleCompletedTodo.bind(this)
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
      return {
        // Updates states items with toggled completed todos
        updatedItems,
      }
    })
  }

  render() {
    const items = this.state.items
    return (
      <Fragment>
        <TodoFolders />
        <div className="TodoSheet">
          <AddTodo newTodo={this.handleAddTodo} items={items} />
          <TodoItems
            items={items}
            deleteTodo={this.handleDeleteTodo}
            toggleCompletedTodo={this.handleToggleCompletedTodo}
          />
        </div>
      </Fragment>
    )
  }
}

export default Todo
