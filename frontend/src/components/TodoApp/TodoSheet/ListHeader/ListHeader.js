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
  const [thisFolder, setThisFolder] = useState({})
  const [showEditButton, setShowEditButton] = useState(false)

  useEffect(() => {
    const thisFolder = findFromID.folder(openFolder, folders)
    setThisFolder(thisFolder)
    setOpenFolderNewName(thisFolder.name)
    setMarkedForDelete(false)
    setShowEditButton(false)
  }, [openFolder, folders, setMarkedForDelete])

  const type = 'ListHeader'
  console.log(thisFolder)
  return (
    <div className={type}>
      <form
        onSubmit={e => {
          updateFolder('UPDATE_FOLDER_NAME', openFolder, openFolderNewName)
          setShowEditButton(false)
          e.preventDefault()
        }}
      >
        <button className={showEditButton ? 'visible' : 'hidden'} type="submit">
          <MdEdit />
        </button>
        <input
          className={`${type}__folder--input ${thisFolder.color}`}
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
