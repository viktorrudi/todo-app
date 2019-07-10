import React, { useContext, useState } from 'react'
import { TodoContext } from '../../TodoContext'
import { MdCheck } from 'react-icons/md'
import './CreateFolder.scss'

export default function CreateFolder () {
  const { createFolder } = useContext(TodoContext)
  const [newFolderName, setNewFolderName] = useState('')

  const handleSubmit = e => {
    createFolder(newFolderName)
    setNewFolderName('')
    e.preventDefault()
  }

  const folderMaxLength = 30

  const type = 'CreateFolder'
  return (
    <form className={type} onSubmit={handleSubmit}>
      <button
        className={newFolderName.length > 0 ? 'visible' : 'hidden'}
        type="submit"
      >
        <MdCheck />
      </button>
      <input
        className={`${type}--addFolderField`}
        type="text"
        placeholder="+ new folder"
        onChange={e =>
          e.target.value.length <= folderMaxLength
            ? setNewFolderName(e.target.value)
            : null
        }
        value={newFolderName}
      />
      <input type="submit" value="" hidden />
    </form>
  )
}
