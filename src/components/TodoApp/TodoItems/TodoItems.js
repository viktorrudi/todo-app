import React, { Component } from 'react'
import TodoItem from './TodoItem'
import _ from 'lodash'
import { findItemsInFolder } from '../../utilities/utilities'

class TodoItems extends Component {
  render() {
    // Finds and returns todo items associated with the folder
    let openedFolder
    if (this.props.openFolder) {
      openedFolder = findItemsInFolder(this.props.items, this.props.openFolder)
    }

    // FIXME: Sort by date created (new Date() stamp)
    const dateFilter = _.sortBy(openedFolder || this.props.items, item => {
      return new Date(item.creationStamp)
    })

    // Sorted by having uncompleted tasks first, and completed at the end
    let completedSorted = _.sortBy(dateFilter, ['completed'])

    let allItems = completedSorted.map(item => (
      <TodoItem
        key={item.id}
        item={item}
        deleteTodo={this.props.deleteTodo}
        toggleCompletedTodo={this.props.toggleCompletedTodo}
      />
    ))

    return <main>{allItems}</main>
  }
}

export default TodoItems
