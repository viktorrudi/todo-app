import React, { useState, useContext, Fragment } from 'react'
import { propTypeForItems } from '../../../../../proptypes'
import { TodoContext } from '../../../../../TodoContext'
import './ItemOptions.scss'

export default function ChangeFolder (props) {
  const context = useContext(TodoContext)

  // Toggle visibility of folder dropdown
  const [openFolderChange, setOpenFolder] = useState(false)

  const handleClick = () => {
    setOpenFolder(!openFolderChange)
  }

  const changeItemFolder = folder => {
    context.updateItem('CHANGE_ITEM_FOLDER', folder)
  }

  let availableFolders = (
    <div className="ChangeFolder__folders">
      {context.folders.map(folder => (
        <div
          className="ChangeFolder__folders--folder"
          key={folder.id}
          onClick={() => changeItemFolder(folder)}
        >
          {folder.name}
        </div>
      ))}
    </div>
  )

  return (
    <Fragment>
      <div className="ChangeFolder small-btn btn-update" onClick={handleClick}>
        Change folder
      </div>

      {/* Only show folder items on "Change folder" click */}
      {openFolderChange ? availableFolders : null}
    </Fragment>
  )
}

ChangeFolder.propTypes = {
  openitem: propTypeForItems
}
