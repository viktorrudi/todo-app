import React, { useState, useContext, useEffect } from 'react'
import { TodoContext } from '../../../TodoContext'
import { MdFolder } from 'react-icons/md'
import { findItemFromID } from '../../../../../utilities/utilities'
import './ItemOptions.scss'

export default function ChangeFolder () {
  const context = useContext(TodoContext)

  // Toggle visibility of folder dropdown
  const [openFolderChange, setOpenFolder] = useState(false)

  const changeItemFolder = folder => {
    context.updateItem('CHANGE_ITEM_FOLDER', folder)
    setOpenFolder(false)
  }

  const type = 'ChangeFolder'
  return (
    <>
      <div
        className={`${type} small-btn btn-update`}
        onClick={() => setOpenFolder(!openFolderChange)}
      >
        <MdFolder /> Change folder
      </div>
      {openFolderChange ? (
        <div className={`${type}__folders`}>
          {context.folders.map(folder => (
            <div
              className={`${type}__folders--folder`}
              key={folder._id}
              onClick={() => changeItemFolder(folder)}
            >
              {folder.name}
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}
