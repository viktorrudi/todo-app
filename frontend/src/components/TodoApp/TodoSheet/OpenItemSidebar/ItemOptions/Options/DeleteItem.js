import React, { useContext } from 'react'
import { TodoContext } from '../../../../TodoContext'
import { MdDelete } from 'react-icons/md'

export default function DeleteItem () {
  const { openItem, removeTodoItem } = useContext(TodoContext)

  return (
    <div
      openitem={openItem}
      className="small-btn btn-delete"
      onClick={() => removeTodoItem(openItem)}
    >
      <MdDelete />
      Delete note
    </div>
  )
}
