import React, { Component } from 'react'
import ItemFooter from './ItemFooter/ItemFooter'
import './TodoItem.scss'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      itemIsHovered: false,
    }
    this.handleDelete = this.handleDelete.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
    this.handleHover = this.handleHover.bind(this)
  }

  handleDelete() {
    this.props.deleteTodo(this.props.item.id)
  }

  handleComplete() {
    this.props.toggleCompletedTodo(this.props.item.id)
  }

  handleHover() {
    this.setState(prevState => {
      return {
        itemIsHovered: !prevState.itemIsHovered,
      }
    })
  }

  render() {
    const completed = this.props.item.completed
    const id = this.props.item.id
    const defaultFolderStyle = {
      color: 'rgba(0,0,0,0)',
      borderColor: 'rgba(0,0,0,0)',
    }

    const folder = this.props.folder || defaultFolderStyle
    const timeCreated = this.props.item.timeCreated
    const type = 'TodoItem'
    const folderStyle = {
      borderColor: folder.color,
      color: folder.color,
    }

    return (
      <div className={type} onMouseEnter={this.handleHover} onMouseLeave={this.handleHover}>
        <input
          type="checkbox"
          className={`${type}__action--done`}
          onChange={this.handleComplete}
          checked={this.props.item.completed}
          id={id}
        />

        {this.state.itemIsHovered ? (
          <span className={`${type}__action--delete`} onClick={this.handleDelete} id={id}>
            <FontAwesomeIcon icon={faTimes} color="#fff" />
          </span>
        ) : (
          false
        )}

        <div className={`${type}__item`} style={completed ? { color: '#aaa' } : { color: '#000' }}>
          {this.props.item.text}
        </div>
        <ItemFooter folderStyle={folderStyle} folderName={folder.name} timeCreated={timeCreated} />
      </div>
    )
  }
}

export default TodoItem
