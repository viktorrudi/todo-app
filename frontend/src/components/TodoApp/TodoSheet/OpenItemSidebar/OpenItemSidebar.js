import React, { useState, useEffect, useContext } from 'react'
import './OpenItemSidebar.scss'
import ItemOptions from './ItemOptions/ItemOptions'
import { findOpenItem } from '../../../../utilities/utilities'
import { TodoContext } from '../../TodoContext'
import { MdClose } from 'react-icons/md'

export default function OpenItemSidebar () {
  const { updateItem, items, openItem, setOpenItem } = useContext(TodoContext)
  const [itemText, setItemText] = useState('')

  const handleSubmit = e => {
    updateItem('UPDATE_ITEM_TEXT', openItem, itemText)
    e.preventDefault()
  }

  useEffect(() => {
    setItemText(findOpenItem(items, openItem).text)
  }, [openItem, items])

  const type = 'OpenItemSidebar'

  return (
    <div className={`${type} ${openItem ? 'open' : 'closed'}`}>
      <div className={`${type}__close`} onClick={() => setOpenItem(null)}>
        <MdClose />
        Close
      </div>

      <form onSubmit={handleSubmit}>
        <input
          className={`${type}__note-input`}
          type="text"
          value={itemText}
          onChange={e => setItemText(e.target.value)}
        />
      </form>

      <div className={`${type}__info`}>
        <div className={`${type}__info--time`}>
          Created {findOpenItem(items, openItem).creationStamp}
        </div>
      </div>

      <div className={`${type}__actions`}>
        <ItemOptions />
      </div>
    </div>
  )
}
