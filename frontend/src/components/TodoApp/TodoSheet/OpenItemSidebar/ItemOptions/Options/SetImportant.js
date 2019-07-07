import React, { useContext, useEffect, useState } from 'react'
import { TodoContext } from '../../../../TodoContext'
import { findOpenItem } from '../../../../../../utilities/utilities'
import { MdStar, MdStarBorder } from 'react-icons/md'

export default function SetImportant () {
  const { items, openItem, updateItem } = useContext(TodoContext)
  const [important, setImportant] = useState(false)

  useEffect(() => {
    const item = findOpenItem(items, openItem)
    if (item.important) setImportant(item.important)
    setImportant(!item.important)
  })

  return (
    <div
      className="small-btn btn-important"
      onClick={() => updateItem('TOGGLE_ITEM_IMPORTANT', openItem)}
    >
      {important ? <MdStarBorder /> : <MdStar />}
      Important
    </div>
  )
}
