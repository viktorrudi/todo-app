import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../../../../TodoContext'
import { findOpenItem } from '../../../../../../utilities/utilities'
import { MdStar, MdStarBorder } from 'react-icons/md'

export default function SetImportant () {
  const context = useContext(TodoContext)
  const [important, setImportant] = useState(false)

  useEffect(() => {
    const item = findOpenItem(context.items, context.openItem)
    if (item.important) setImportant(item.important)
    setImportant(!item.important)
  }, [context])

  const type = 'SetImportant'
  return (
    <span
      className={type}
      onClick={() =>
        context.updateItem('TOGGLE_ITEM_IMPORTANT', context.openItem)
      }
    >
      {important ? (
        <>
          <MdStarBorder />
          <label>Set as important</label>
        </>
      ) : (
        <>
          <MdStar />
          <label>Set as unimportant</label>
        </>
      )}
    </span>
  )
}
