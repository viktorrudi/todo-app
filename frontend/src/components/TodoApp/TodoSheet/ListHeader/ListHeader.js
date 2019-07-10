import React, { useContext, useState, useEffect } from 'react'
import { TodoContext } from '../../TodoContext'
import { findFromID } from '../../../../utilities/utilities'
import { MdEdit } from 'react-icons/md'
import './ListHeader.scss'
import FolderOptions from './FolderOptions/FolderOptions'

export default function ListHeader () {
  const { setMarkedForDelete, updateFolder, openFolder, folders } = useContext(
    TodoContext
  )
  const [openFolderNewName, setOpenFolderNewName] = useState('')
  const [showEditButton, setShowEditButton] = useState(false)

  useEffect(() => {
    const thisFolder = findFromID.folder(openFolder, folders)
    setOpenFolderNewName(thisFolder.name)
    setMarkedForDelete(false)
    setShowEditButton(false)
  }, [openFolder])

  const type = 'ListHeader'
  return (
    <div className={type}>
      <form
        onSubmit={e => {
          updateFolder(openFolder, openFolderNewName)
          setShowEditButton(false)
          e.preventDefault()
        }}
      >
        <button className={showEditButton ? 'visible' : 'hidden'} type="submit">
          <MdEdit />
        </button>
        <input
          id={openFolder._id}
          className={`${type}__folder--input`}
          type="text"
          value={openFolderNewName}
          onChange={e => {
            setOpenFolderNewName(e.target.value)
            setShowEditButton(true)
            setMarkedForDelete(false)
          }}
          autoComplete="off"
        />
      </form>
      <FolderOptions />
    </div>
  )
}
