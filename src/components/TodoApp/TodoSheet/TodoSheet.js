import React, { Component, Fragment } from 'react'
import AddTodo from './AddTodo/AddTodo'
import TodoItems from './TodoItems/TodoItems'
import ListHeader from './ListHeader/ListHeader'
import OpenItem from './OpenItem/OpenItem'

class TodoSheet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openItem: false,
      item: null,
    }
  }

  handleClick = item => {
    this.setState({
      openItem: true,
      item,
    })
  }

  handleClose = () => {
    this.setState({
      openItem: false,
      item: {},
    })
  }

  render() {
    const type = 'TodoSheet'
    return (
      <Fragment>
        <div className={`${type}`}>
          <div className={`${type}__items`}>
            <AddTodo
              items={this.props.items}
              newTodo={this.props.newTodo}
              openFolder={this.props.openFolder}
            />
            {this.props.openFolder && (
              <ListHeader
                folders={this.props.folders}
                openFolder={this.props.openFolder}
                changeFolderName={this.props.changeFolderName}
                deleteFolder={this.props.deleteFolder}
              />
            )}
            <TodoItems
              items={this.props.items}
              folders={this.props.folders}
              deleteTodo={this.props.deleteTodo}
              toggleCompletedTodo={this.props.toggleCompletedTodo}
              openFolder={this.props.openFolder}
              clickedItem={this.handleClick}
            />
          </div>
        </div>
        <div className="OpenItem">
          {this.state.openItem && (
            <OpenItem openItem={this.state.item} closeOpenedItem={this.handleClose} />
          )}
        </div>
      </Fragment>
    )
  }
}

export default TodoSheet
