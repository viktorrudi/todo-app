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

  const type = 'ChangeFolder__folders'

  return (
    <Fragment>
      <div className="ChangeFolder small-btn btn-update" onClick={handleClick}>
        Change folder
      </div>
      {openFolderChange ? (
        <div className={type}>
          {context.folders.map(folder => (
            <div
              className={`${type}--folder`}
              key={folder.id}
              onClick={() => changeItemFolder(folder)}
            >
              {folder.name}
            </div>
          ))}
        </div>
      ) : null}
    </Fragment>
  )
}

ChangeFolder.propTypes = {
  openitem: propTypeForItems
}
