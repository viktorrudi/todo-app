/* eslint-disable standard/object-curly-even-spacing */
import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'
import { TodoContext } from '../../TodoContext'
import { MdStar, MdInbox } from 'react-icons/md'

export default function ChangeView () {
  const { updateItem, setItemView, viewItems, setOpenFolder } = useContext(
    TodoContext
  )

  const [{ isOver }, drop] = useDrop({
    accept: 'TODO_ITEM',
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    }),
    drop: monitor => updateItem('CHANGE_ITEM_FOLDER_DND', monitor.itemID, null)
  })

  return (
    <>
      <div
        ref={drop}
        className={`AllItems option ${viewItems === 'all' ? 'active' : ''}`}
        style={isOver ? { background: '#efefef' } : null}
        onClick={() => {
          setItemView('all')
          setOpenFolder(null)
        }}
      >
        <MdInbox /> All items
      </div>

      <div
        className={`Important option ${
          viewItems === 'important' ? 'active' : ''
        }`}
        onClick={() => {
          setItemView('important')
          setOpenFolder(null)
        }}
      >
        <MdStar /> Important items
      </div>
    </>
  )
}
