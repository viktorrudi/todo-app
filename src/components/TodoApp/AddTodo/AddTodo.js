import React from 'react'
import moment from 'moment'
import './AddTodo.scss'

class AddTodo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoText: '',
    }
    this.handleNewTodoText = this.handleNewTodoText.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNewTodoText(e) {
    this.setState({
      todoText: e.target.value,
    })
    e.preventDefault()
  }

  handleSubmit(e) {
    if (this.state.todoText.length > 0) {
      //TODO: Create DB function to store new todo item

      const nowStamp = new Date()
      // Use function in props to add to parents items state
      this.props.newTodo({
        id: this.props.items.length + 1,
        text: this.state.todoText,
        folder: this.props.openFolder,
        timeCreated: moment().format('HH:mm'),
        dateCreated: moment().format('DD-MM-YYYY'),
        creationStamp: nowStamp,
      })

      // Reset textfield
      this.setState({
        todoText: '',
      })
    }

    e.preventDefault()
  }
  render() {
    const type = 'AddTodo'
    return (
      <form className={type} onSubmit={this.handleSubmit}>
        <input
          className={`${type}__addTodoField`}
          type="text"
          placeholder="add item"
          value={this.state.todoText}
          onChange={this.handleNewTodoText}
        />
        <input className={`${type}__action--add`} type="submit" value="+" />
      </form>
    )
  }
}

export default AddTodo
