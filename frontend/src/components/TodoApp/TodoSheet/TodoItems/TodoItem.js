import React, { useContext } from 'react'
import { useDrag } from 'react-dnd'
import { TodoContext } from '../../TodoContext'
import PropTypes from 'prop-types'
import { propTypeForItems } from '../../../../proptypes'
import { MdStar } from 'react-icons/md'
import './TodoItem.scss'

export default function TodoItem ({ item, findFolder }) {
  const { openFolder, updateItem, setOpenItem } = useContext(TodoContext)

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

  let itemFolder
  itemFolder = findFolder(item.folder)

  const type = 'TodoItem'
  return (
    <div
      ref={drag}
      className={`${type} ${item.important ? 'important' : ''}`}
      onClick={e => handleClick(e, item)}
      style={
        isDragging
          ? {
            opacity: '.4'
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

      <div
        className={`${type}__item`}
        style={item.completed ? { color: '#aaa' } : { color: '#000' }}
      >
        {item.text}
        {openFolder ? null : (
          <aside className={`${type}__item--folder`}>
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
