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
    // Will only submit if it contains anything (space excluded)
    if (todoText.replace(/\s/g, '').length) {
      context.addTodoItem(todoText)
      setTodoText('')
    }

    e.preventDefault()
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
      {/* <input className={`${type}__action--add`} type="submit" value="+" /> */}
    </form>
  )
}
