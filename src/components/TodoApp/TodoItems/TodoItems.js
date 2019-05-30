import React, { Component } from 'react'
import TodoItem from './TodoItem'
import _ from 'lodash'

class TodoItems extends Component {
  render() {
    const items = this.props.items

    // FIXME: Sort by date created (new Date() stamp)
    const dateFilter = _.sortBy(items, item => {
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
