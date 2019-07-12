import React, { useContext } from 'react'
import { useDrop } from 'react-dnd'
import { TodoContext } from '../../TodoContext'
import { MdStar, MdInbox } from 'react-icons/md'

export default function ChangeView () {
  const { updateItem, setItemView, setOpenFolder } = useContext(TodoContext)

  const [{ isOver, canDrop }, drop] = useDrop({
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
        className="AllItems option"
        style={isOver ? { background: '#efefef' } : null}
        onClick={() => {
          setItemView('all')
          setOpenFolder(null)
        }}
      >
        <MdInbox /> All items
      </div>

      <div
        className="Important option"
        onClick={() => setItemView('important')}
      >
        <MdStar /> Important items
      </div>
    </>
  )
}
