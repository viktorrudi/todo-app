import React, { useState, useEffect, useContext } from 'react'
import './OpenItemSidebar.scss'
import ItemOptions from './ItemOptions/ItemOptions'
import { TodoContext } from '../../TodoContext'
import { MdClose } from 'react-icons/md'

export default function OpenItemSidebar () {
  const context = useContext(TodoContext)
  const [itemText, setItemText] = useState('')

  const handleSubmit = e => {
    context.updateItem('UPDATE_ITEM_TEXT', context.openItem, itemText)
    e.preventDefault()
  }

  // TODO: Move into utilities
  const findOpenItem = openItemID => {
    const [found] = context.items.filter(folder => {
      return openItemID === folder._id
    })
    // Returns name of item
    return found
  }

  useEffect(() => {
    setItemText(findOpenItem(context.openItem).text)
  }, [context.openItem])

  const type = 'OpenItemSidebar'

  return (
    <div className={`${type} ${context.openItem ? 'open' : 'closed'}`}>
      <div
        className={`${type}__close`}
        onClick={() => context.setOpenItem(null)}
      >
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
          Created {findOpenItem(context.openItem).creationStamp}
        </div>
      </div>

      <div className={`${type}__actions`}>
        <ItemOptions openItem={context.openItem} />
      </div>
    </div>
  )
}
