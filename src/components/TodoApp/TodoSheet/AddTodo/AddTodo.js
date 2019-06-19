import React, { useState, useContext } from 'react'
// import { todoReducer } from '../../../../reducers'
import { TodoContext } from '../../../../TodoContext'
import './AddTodo.scss'

export default function AddTodo () {
  const [todoText, setTodoText] = useState('')
  const context = useContext(TodoContext)

  const handleNewTodoText = e => {
    setTodoText(e.target.value)
  }
  const handleSubmit = e => {
    e.preventDefault()
    // setTodo(todoText)
    context.addTodoItem(todoText)
  }

  const type = 'AddTodo'
  return (
    <form className={type} onSubmit={handleSubmit}>
      <input
        className={`${type}__addTodoField`}
        type="text"
        placeholder="add item"
        value={todoText}
        onChange={handleNewTodoText}
      />
      <input className={`${type}__action--add`} type="submit" value="+" />
    </form>
  )
}

// class AddTodo extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       todoText: ''
//     }
//   }

//   handleNewTodoText = e => {
//     this.setState({
//       todoText: e.target.value
//     })
//     e.preventDefault()
//   }

//   handleSubmit = e => {
//     if (this.state.todoText.length > 0) {
//       // TODO: Create DB function to store new todo item

//       const nowStamp = new Date()
//       // Use function in props to add to parents items state
//       this.props.newTodo({
//         id: this.props.items.length + 1,
//         text: this.state.todoText,
//         folder: this.props.openFolder,
//         completed: false,
//         timeCreated: moment().format('HH:mm'),
//         dateCreated: moment().format('DD-MM-YYYY'),
//         creationStamp: nowStamp
//       })

//       // Reset textfield after submit
//       this.setState({
//         todoText: ''
//       })
//     }

//     e.preventDefault()
//   }
//   render () {
//     const type = 'AddTodo'
//     return (
//       <form className={type} onSubmit={this.handleSubmit}>
//         <input
//           className={`${type}__addTodoField`}
//           type="text"
//           placeholder="add item"
//           value={this.state.todoText}
//           onChange={this.handleNewTodoText}
//         />
//         <input className={`${type}__action--add`} type="submit" value="+" />
//       </form>
//     )
//   }
// }

// export default AddTodo
