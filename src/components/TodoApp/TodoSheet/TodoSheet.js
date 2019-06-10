import React, { Component } from 'react'
import AddTodo from './AddTodo/AddTodo'
import TodoItems from './TodoItems/TodoItems'
import ListHeader from './ListHeader/ListHeader'

class TodoSheet extends Component {
  render() {
    return (
      <div className="TodoSheet">
        <AddTodo
          newTodo={this.props.newTodo}
          items={this.props.items}
          openFolder={this.props.openFolder}
        />
        {this.props.openFolder && (
          <ListHeader
            openFolder={this.props.openFolder}
            folders={this.props.folders}
            changeFolderName={this.props.changeFolderName}
            deleteFolder={this.props.deleteFolder}
          />
        )}
        <TodoItems
          items={this.props.items}
          deleteTodo={this.props.deleteTodo}
          toggleCompletedTodo={this.props.toggleCompletedTodo}
          openFolder={this.props.openFolder}
          folders={this.props.folders}
        />
      </div>
    )
  }
}

export default TodoSheet
