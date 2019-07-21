import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'
import PropTypes from 'prop-types'
import { TodoContext } from '../../TodoContext'

export default function Folder ({ folder, open, itemCount }) {
  const {
    updateItem,
    setItemView,
    setMarkedForDelete,
    setOpenFolder
  } = useContext(TodoContext)

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'TODO_ITEM',
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    }),
    drop: monitor =>
      updateItem('CHANGE_ITEM_FOLDER_DND', monitor.itemID, folder._id)
  })

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
      ref={drop}
      style={isOver ? { background: '#efefef' } : null}
    >
      <span className={`${type}--icon ${folder.color}`} />
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
