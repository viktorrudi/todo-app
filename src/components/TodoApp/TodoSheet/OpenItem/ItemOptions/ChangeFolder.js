import React, { useState, useContext, Fragment } from 'react'
import { TodoContext } from '../../../../../TodoContext'

export default function ChangeFolder (props) {
  // Todocontext
  const [todo, setTodo] = useContext(TodoContext)
  // Toggle visibility of folder dropdown
  const [openFolderChange, setOpenFolder] = useState(false)

  const handleClick = () => {
    setOpenFolder(!openFolderChange)
  }

  const changeItemFolder = id => {
    setTodo(prevTodo => {
      const updatedItems = prevTodo.items.map(item => {
        if (item.id === props.openitem.id) {
          item.folder = id
        }
        return item
      })
      return { ...prevTodo, items: updatedItems }
    })
  }

  let availableFolders = (
    <div className="ChangeFolder__folders">
      {todo.folders.map(folder => (
        <div
          className="ChangeFolder__folders--folder"
          key={folder.id}
          onClick={() => changeItemFolder(folder.id)}
        >
          {folder.name}
        </div>
      ))}
    </div>
  )

  return (
    <Fragment>
      <div className="ChangeFolder small-btn btn-update" onClick={handleClick}>
        Change folder: <small>{props.openitem.folder}</small>
      </div>

      {/* Only show folder items on "Change folder" click */}
      {openFolderChange ? availableFolders : null}
    </Fragment>
  )
}
