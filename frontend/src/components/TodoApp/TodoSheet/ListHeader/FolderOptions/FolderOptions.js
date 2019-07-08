import React, { useContext } from 'react'
import { TodoContext } from '../../../TodoContext'
import { MdDelete } from 'react-icons/md'

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
    <div className={`${type}__folder--delete`} onClick={toggleDelete}>
      {markedForDelete ? <span>Delete folder & items</span> : null}
      <MdDelete />
    </div>
  )
}
