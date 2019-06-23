import React, { useState, useContext, Fragment } from 'react'
import { propTypeForItems } from '../../../../../proptypes'
import { TodoContext } from '../../../../../TodoContext'
import './ItemOptions.scss'
import { MdFolder } from 'react-icons/md'

export default function ChangeFolder (props) {
  const context = useContext(TodoContext)

  // Toggle visibility of folder dropdown
  const [openFolderChange, setOpenFolder] = useState(false)

  const handleClick = () => {
    setOpenFolder(!openFolderChange)
  }

  const changeItemFolder = folder => {
    context.updateItem('CHANGE_ITEM_FOLDER', folder)
    setOpenFolder(false)
  }

  console.log(props.itemFolder)

  const type = 'ChangeFolder'
  return (
    <Fragment>
      <div className={`${type} small-btn btn-update`} onClick={handleClick}>
        <MdFolder /> Change folder
      </div>

      {openFolderChange ? (
        <div className={`${type}__folders`}>
          {context.folders.map(folder => (
            <div
              className={`${type}__folders--folder`}
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
