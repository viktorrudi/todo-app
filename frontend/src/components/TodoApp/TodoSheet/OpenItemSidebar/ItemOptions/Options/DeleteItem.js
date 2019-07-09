import React, { useContext } from 'react'
import { TodoContext } from '../../../../TodoContext'
import { MdDelete } from 'react-icons/md'

export default function DeleteItem () {
  const { openItem, removeTodoItem } = useContext(TodoContext)
  const type = 'DeleteItem'
  return (
    <span
      className={type}
      // className="small-btn btn-delete"
      onClick={() => removeTodoItem(openItem)}
    >
      <MdDelete /> <label>Delete item</label>
    </span>
  )
}
