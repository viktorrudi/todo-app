import React, { useContext, useState } from 'react'
import { TodoContext } from '../../TodoContext'
import './CreateFolder.scss'

export default function CreateFolder () {
  const { createFolder } = useContext(TodoContext)
  const [newFolderName, setNewFolderName] = useState('')

  const handleSubmit = e => {
    createFolder(newFolderName)
    setNewFolderName('')
    e.preventDefault()
  }
  const type = 'CreateFolder'

  return (
    <form className={type} onSubmit={handleSubmit}>
      <input
        className={`${type}--addFolderField`}
        type="text"
        placeholder="+ new folder"
        onChange={e => setNewFolderName(e.target.value)}
        value={newFolderName}
      />
      <input type="submit" value="" hidden />
    </form>
  )
}
