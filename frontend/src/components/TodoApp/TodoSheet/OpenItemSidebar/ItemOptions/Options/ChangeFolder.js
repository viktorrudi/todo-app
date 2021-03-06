import React, { useState, useContext } from 'react'
import { TodoContext } from '../../../../TodoContext'
import { MdFolder } from 'react-icons/md'
import '../ItemOptions.scss'

export default function ChangeFolder () {
  const { updateItem, folders } = useContext(TodoContext)
  // Toggle visibility of folder dropdown
  const [openFolderChange, setOpenFolder] = useState(false)

  const changeItemFolder = folder => {
    updateItem('CHANGE_ITEM_FOLDER', folder)
    setOpenFolder(false)
  }

  const type = 'ChangeFolder'
  return (
    <span className={type} onClick={() => setOpenFolder(!openFolderChange)}>
      <MdFolder /> <label>Change folder</label>
      <div
        className={`${type}__folders ${openFolderChange ? 'open' : 'closed'}`}
      >
        {folders.map(folder => (
          <div
            className={`${type}__folders--folder`}
            key={folder._id}
            onClick={() => changeItemFolder(folder)}
          >
            {folder.name}
          </div>
        ))}
      </div>
    </span>
  )
}
