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

  const toggleDelete = () => {
    if (markedForDelete) {
      removeFolder(openFolder)
    }
    setMarkedForDelete(true)
  }

  const type = 'ListHeader'
  return (
    <div
      className={`${type}__folder--delete`}
      onClick={toggleDelete}
      onMouseLeave={() => setMarkedForDelete(false)}
    >
      {markedForDelete ? (
        <span className="confirm">
          Delete folder & items?
          <MdWarning />
        </span>
      ) : (
        <MdDelete />
      )}
    </div>
  )
}
