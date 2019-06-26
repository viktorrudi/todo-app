/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { TodoContext } from '../../../../TodoContext'
import PropTypes from 'prop-types'
import { propTypeForItems, propTypeForFolders } from '../../../../proptypes'
import './TodoItem.scss'

class TodoItem extends Component {
  static contextType = TodoContext

  static propTypes = {
    toggleCompletedTodo: PropTypes.func,
    item: PropTypes.shape({ ...propTypeForItems }),
    openfolder: PropTypes.shape({ ...propTypeForFolders })
  }

  handleClick = (e, clickedItem) => {
    if (e.target.tagName === 'SPAN') {
      this.context.toggleTodoComplete(this.props.item._id)
    }
    if (e.target.tagName === 'DIV') {
      this.context.setOpenItem(clickedItem._id)
    }
  }

  render () {
    const { item, findFolder } = this.props
    const completed = item.completed

    let itemFolder
    itemFolder = findFolder(item.folder)

    const type = 'TodoItem'
    return (
      <div
        className={type}
        onClick={e => {
          this.handleClick(e, item)
        }}
      >
        {/* Custom checkbox */}
        <label>
          <input
            type="checkbox"
            className={`${type}__action--done`}
            // onChange={e => this.handleClick(e, null)}
            checked={item.completed}
            id={item._id}
          />
          <span className="check-toggle" onClick={() => this.handleClick} />
        </label>

        <div
          className={`${type}__item`}
          style={completed ? { color: '#aaa' } : { color: '#000' }}
        >
          {item.text}
          {this.context.openFolder ? null : (
            <aside className={`${type}__item--folder`}>
              {itemFolder ? itemFolder.name : null}
            </aside>
          )}
        </div>
      </div>
    )
  }
}

export default TodoItem
