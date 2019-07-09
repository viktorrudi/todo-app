import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { TodoContext } from '../../TodoContext'

export default function Folder ({ folder, open, itemCount }) {
  const { setItemView, setMarkedForDelete, setOpenFolder } = useContext(
    TodoContext
  )

  const handleClick = e => {
    setMarkedForDelete(false)
    setOpenFolder(e.target.id)
    setItemView('folder')
  }

  const type = 'Folder'
  return (
    <div
      className={open ? `${type} ${type}--open` : type}
      onClick={handleClick}
      id={folder._id}
    >
      <span
        className={`${type}--icon`}
        style={{ backgroundColor: folder.color }}
      />
      <p className={`${type}--name`}>{folder.name}</p>
      <span className={`${type}--badge`}>
        {itemCount > 99 ? '99+' : itemCount}
      </span>
    </div>
  )
}

Folder.propTypes = {
  folder: PropTypes.object,
  itemCount: PropTypes.number,
  open: PropTypes.bool
}
