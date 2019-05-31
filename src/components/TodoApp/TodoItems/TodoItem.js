import React, { Component } from 'react'
import './TodoItem.scss'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class TodoItem extends Component {
  constructor(props) {
    super(props)
    this.handleDelete = this.handleDelete.bind(this)
    this.handleComplete = this.handleComplete.bind(this)
  }
  handleDelete = () => {
    this.props.deleteTodo(this.props.item.id)
  }
  handleComplete = () => {
    this.props.toggleCompletedTodo(this.props.item.id)
  }
  render() {
    const completed = this.props.item.completed
    const id = this.props.item.id
    const type = 'TodoItem'

    return (
      <div className={type}>
        <input
          type="checkbox"
          className={`${type}__action--done`}
          onChange={this.handleComplete}
          checked={this.props.item.completed}
          id={id}
        />
        <span className={`${type}__action--delete`} onClick={this.handleDelete} id={id}>
          <FontAwesomeIcon icon={faTimes} color="#fff" />
        </span>

        <div className={`${type}__item`} style={completed ? { color: '#aaa' } : { color: '#000' }}>
          {this.props.item.text}
        </div>

        <div className={`${type}__footer`}>
          <div className={`${type}__item--time`}>{this.props.item.timeCreated}</div>
        </div>
      </div>
    )
  }
}

export default TodoItem
