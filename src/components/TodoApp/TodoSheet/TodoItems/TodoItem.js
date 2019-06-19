/* eslint-disable react/prop-types */
import React, { Component } from 'react'
import { TodoContext } from '../../../../TodoContext'
import PropTypes from 'prop-types'
import { propTypeForItems, propTypeForFolders } from '../../../../proptypes'
import ItemFooter from './ItemFooter/ItemFooter'
import './TodoItem.scss'
import { findParentTag } from '../../../utilities/utilities'

class TodoItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itemIsHovered: false
    }
  }

  static contextType = TodoContext

  static propTypes = {
    toggleCompletedTodo: PropTypes.func,
    clickedItem: PropTypes.func,
    openitem: PropTypes.shape({ ...propTypeForItems }),
    openfolder: PropTypes.shape({ ...propTypeForFolders })
  }

  handleComplete = () => {
    this.props.toggleCompletedTodo(this.props.openitem.id)
  }

  handleClick = (e, clickedItem) => {
    const checkbox = 'TodoItem__action--done'
    const found = findParentTag(e.target, e.target.className === checkbox)

    if (!found) {
      this.props.clickedItem(clickedItem)
    }
  }

  render () {
    const completed = this.props.openitem.completed
    const id = this.props.openitem.id
    const defaultFolderStyle = {
      color: 'rgba(0,0,0,0)',
      borderColor: 'rgba(0,0,0,0)'
    }

    const openfolder = this.props.openfolder || defaultFolderStyle
    const timeCreated = this.props.openitem.timeCreated
    const type = 'TodoItem'
    const folderStyle = {
      borderColor: openfolder.color,
      color: openfolder.color
    }

    return (
      <div
        className={type}
        onMouseEnter={this.handleHover}
        onMouseLeave={this.handleHover}
        onClick={e => this.handleClick(e, this.props.openitem)}
      >
        <input
          type="checkbox"
          className={`${type}__action--done`}
          onChange={this.handleComplete}
          checked={this.props.openitem.completed}
          id={id}
        />

        <div
          className={`${type}__item`}
          style={completed ? { color: '#aaa' } : { color: '#000' }}
        >
          {this.props.openitem.text}
        </div>
        <ItemFooter
          folderStyle={folderStyle}
          folderName={openfolder.name}
          timeCreated={timeCreated}
        />
      </div>
    )
  }
}

export default TodoItem
