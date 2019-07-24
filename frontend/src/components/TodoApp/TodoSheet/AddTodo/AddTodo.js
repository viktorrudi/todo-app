import React, { useState, useContext } from 'react'
import { TodoContext } from '../../TodoContext'
import './AddTodo.scss'

export default function AddTodo () {
  const { addTodoItem, viewItems } = useContext(TodoContext)
  const [todoText, setTodoText] = useState('')

  const handleSubmit = e => {
    // Will only submit if it contains anything (space excluded)
    // Multiple spaces cut down
    if (todoText.replace(/\s/g, '').length) {
      addTodoItem(todoText)
      setTodoText('')
    }
    e.preventDefault()
  }

  const type = 'AddTodo'
  return (
    <form
      className={`${type} ${viewItems === 'important' ? 'hidden' : 'visible'}`}
      onSubmit={handleSubmit}
    >
      <input
        className={`${type}__addTodoField`}
        type="text"
        placeholder="add item..."
        value={todoText}
        onChange={e => setTodoText(e.target.value)}
      />
    </form>
  )
}
