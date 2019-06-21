/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { TodoContext } from '../../../../TodoContext'
import PropTypes from 'prop-types'
import { propTypeForItems, propTypeForFolders } from '../../../../proptypes'
import ItemFooter from './ItemFooter/ItemFooter'
import './TodoItem.scss'

class TodoItem extends Component {
  static contextType = TodoContext

  static propTypes = {
    toggleCompletedTodo: PropTypes.func,
    item: PropTypes.shape({ ...propTypeForItems }),
    openfolder: PropTypes.shape({ ...propTypeForFolders })
  }

  handleComplete = () => {
    this.context.toggleTodoComplete(this.props.item.id)
  }

  handleClick = (e, clickedItem) => {
    if (e.target.type !== 'checkbox') {
      // FIXME: This is called twice?
      this.context.setOpenItem(clickedItem.id)
    }
  }

  render () {
    // FIXME: Something happening with opening folder. Cause of double rendering?
    const { item } = this.props
    const completed = item.completed
    const id = item.id

    const defaultFolderStyle = {
      color: 'rgba(0,0,0,0)',
      borderColor: 'rgba(0,0,0,0)'
    }
    const openfolder = this.props.openfolder || defaultFolderStyle

    const folderStyle = {
      borderColor: openfolder.color,
      color: openfolder.color
    }

    const type = 'TodoItem'

    return (
      <div
        className={type}
        onClick={e => {
          // this.props.openitem returns full item object
          this.handleClick(e, this.props.item)
        }}
      >
        <input
          type="checkbox"
          className={`${type}__action--done`}
          onChange={this.handleComplete}
          checked={this.props.item.completed}
          id={id}
        />

        <div
          className={`${type}__item`}
          style={completed ? { color: '#aaa' } : { color: '#000' }}
        >
          {this.props.item.text}
        </div>
        {this.context.openFolder ? null : (
          <ItemFooter folderStyle={folderStyle} folderName={openfolder.name} />
        )}
      </div>
    )
  }
}

export default TodoItem
