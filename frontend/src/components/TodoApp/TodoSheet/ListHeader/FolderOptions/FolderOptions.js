import React, { useContext } from 'react'
import { TodoContext } from '../../../TodoContext'
import { MdDelete, MdWarning } from 'react-icons/md'

export default function FolderOptions () {
  const {
    removeFolder,
    setMarkedForDelete,
    markedForDelete,
    openFolder
  } = useContext(TodoContext)

  const handleDelete = () => {
    if (markedForDelete) {
      removeFolder(openFolder)
    }
    setMarkedForDelete(true)
  }

  const type = 'ListHeader'
  return (
    <>
      <span className={`confirm ${markedForDelete ? 'open' : 'closed'}`}>
        <p>Delete folder and all its items? This cannot be undone</p>
        <br />
        <span className="mini-btn delete" onClick={handleDelete}>
          Delete folder & items
        </span>
        <span
          className="mini-btn cancel"
          onClick={() => setMarkedForDelete(false)}
        >
          Cancel
        </span>
      </span>
      <div
        className={`${type}__folder--delete`}
        onClick={() => setMarkedForDelete(true)}
      >
        <MdDelete />
      </div>
    </>
  )
}
