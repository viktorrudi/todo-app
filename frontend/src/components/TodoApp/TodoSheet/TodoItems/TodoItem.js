import React, { useContext, useState } from 'react'
import { useDrag } from 'react-dnd'
import { TodoContext } from '../../TodoContext'
import PropTypes from 'prop-types'
import { propTypeForItems } from '../../../../proptypes'
import { findFromID } from '../../../../utilities/utilities'
import { MdStar } from 'react-icons/md'
import './TodoItem.scss'

export default function TodoItem ({ item }) {
  const { openFolder, updateItem, setOpenItem, folders } = useContext(
    TodoContext
  )
  const [itemVisible, setItemVisible] = useState(false)

  setTimeout(() => {
    setItemVisible(true)
  }, 100)

  // Handle drag and drop (inserts items ID into the movable object)
  const [{ isDragging }, drag] = useDrag({
    item: { type: 'TODO_ITEM', itemID: item._id },
    collect: monitor => ({
      item: monitor.getItem(),
      isDragging: !!monitor.isDragging()
    })
  })

  const handleClick = (e, clickedItem) => {
    switch (e.target.tagName) {
      case 'SPAN':
        updateItem('TOGGLE_COMPLETE', item._id)
        break
      case 'DIV':
        setOpenItem(clickedItem._id)
        break
      default:
        break
    }
  }

  // Returns related folder for the item
  const itemFolder = findFromID.folder(item.folder, folders)

  const type = 'TodoItem'
  return (
    <div
      ref={drag}
      className={`
        ${type} 
        ${itemVisible ? 'visible' : ''} 
        ${item.important ? 'important' : ''}
        ${item.completed ? 'completed' : ''}
      `}
      onClick={e => handleClick(e, item)}
      style={
        isDragging
          ? {
            maxHeight: 0,
            padding: 0,
            opacity: 0
          }
          : null
      }
    >
      {/* Custom checkbox */}
      <label>
        <input
          type="checkbox"
          className={`${type}__action--done`}
          style={isDragging ? { display: '#none' } : null}
          onChange={handleClick}
          checked={item.completed}
          id={item._id}
        />
        <span className="check-toggle" onClick={handleClick} />
      </label>

      <div className={`${type}__item`}>
        {item.text}
        {openFolder ? null : (
          <aside className={`${type}__item--folder ${itemFolder.color}`}>
            {itemFolder ? itemFolder.name : null}
          </aside>
        )}
        {item.important ? (
          <aside className={`${type}__item--important`}>
            <MdStar />
          </aside>
        ) : null}
      </div>
    </div>
  )
}

TodoItem.propTypes = {
  findFolder: PropTypes.func,
  item: PropTypes.shape({ ...propTypeForItems })
}
