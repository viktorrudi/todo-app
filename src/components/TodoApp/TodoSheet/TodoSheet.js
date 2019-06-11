import React, { Component, Fragment } from "react"
import AddTodo from "./AddTodo/AddTodo"
import TodoItems from "./TodoItems/TodoItems"
import ListHeader from "./ListHeader/ListHeader"
import OpenItem from "./OpenItem/OpenItem"

class TodoSheet extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openItem: false,
      item: null
    }
  }

  handleClick = item => {
    this.setState({
      openItem: true,
      item
    })
  }

  handleClose = () => {
    this.setState({
      openItem: false,
      item: {}
    })
  }

  handleChangeOpenItem = (task, item) => {
    if (task === "change_text") {
      this.props.handleUpdateTodo(task, item)
      this.setState({
        openItem: true,
        item
      })
    }
    if (task === "delete_item") {
      this.props.handleDeleteTodo(item.id)
      this.handleClose()
    }
    // if (task === "change_folder") {
    //   this.props.handleUpdateTodo(task, item)
    // }
  }

  render() {
    const type = "TodoSheet"
    const {
      items,
      newTodo,
      openFolder,
      folders,
      changeFolderName,
      deleteFolder,
      deleteTodo,
      toggleCompletedTodo
    } = this.props
    return (
      <Fragment>
        <div className={`${type}`}>
          <div className={`${type}__items`}>
            <AddTodo items={items} newTodo={newTodo} openFolder={openFolder} />
            {openFolder && (
              <ListHeader
                folders={folders}
                openFolder={openFolder}
                changeFolderName={changeFolderName}
                deleteFolder={deleteFolder}
              />
            )}
            <TodoItems
              items={items}
              folders={folders}
              deleteTodo={deleteTodo}
              toggleCompletedTodo={toggleCompletedTodo}
              openFolder={openFolder}
              clickedItem={this.handleClick}
            />
          </div>
        </div>
        {this.state.openItem && (
          <OpenItem
            openItem={this.state.item}
            closeOpenedItem={this.handleClose}
            handleChangeOpenItem={this.handleChangeOpenItem}
          />
        )}
      </Fragment>
    )
  }
}

export default TodoSheet