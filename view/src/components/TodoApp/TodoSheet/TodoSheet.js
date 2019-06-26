import React, { Component } from 'react'
import { TodoContext } from '../../../TodoContext'
import PropTypes from 'prop-types'
import AddTodo from './AddTodo/AddTodo'
import TodoItems from './TodoItems/TodoItems'
import ListHeader from './ListHeader/ListHeader'
import OpenItem from './OpenItem/OpenItem'
import './TodoSheet.scss'

class TodoSheet extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openItem: false,
      item: null
    }
  }

  static contextType = TodoContext

  static propTupes = {
    openItem: PropTypes.string
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
    if (task === 'change_text') {
      this.props.handleUpdateTodo(task, item)
      this.setState({
        openItem: true,
        item
      })
    }
    if (task === 'delete_item') {
      this.props.handleDeleteTodo(item._id)
      this.handleClose()
    }
  }

  render () {
    const type = 'TodoSheet'
    const { changeFolderName, deleteFolder, toggleCompletedTodo } = this.props

    const { items, folders, openFolder, openItem } = this.context

    return (
      <>
        <div className={`${type}`}>
          <div className={`${type}__items`}>
            <AddTodo items={items} openFolder={openFolder} />
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
              toggleCompletedTodo={toggleCompletedTodo}
              openFolder={openFolder}
              clickedItem={this.handleClick}
            />
          </div>
        </div>
        {openItem && <OpenItem items={items} openItem={openItem} />}
      </>
    )
  }
}

export default TodoSheet
