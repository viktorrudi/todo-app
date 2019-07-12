import React, { useContext } from 'react'
import TodoItem from './TodoItem'
import NoItems from './NoItems/NoItems'
import './TodoItem.scss'
import _ from 'lodash'
import { TodoContext } from '../../TodoContext'

export default function TodoItems () {
  const { viewItems, openFolder, items } = useContext(TodoContext)

  // Toggeling the view of the items
  let selectedView
  switch (viewItems) {
    case 'all': selectedView = items
      break
    case 'important': selectedView = items.filter(item => item.important)
      break
    case 'folder': selectedView = items.filter(item => item.folder === openFolder)
      break
    case 'no-completed': selectedView = items.filter(item => !item.completed)
      break
    default:
      break
  }

  // Sorting
  // selectedView = _.sortBy(selectedView || items, item => new Date(item.creationStamp))
  selectedView = _.sortBy(selectedView, ['important']).reverse()
  selectedView = _.sortBy(selectedView, ['completed'])

  let itemsToDisplay = selectedView.map(item => (
    <TodoItem key={item._id} item={item} />
  ))

  return (
    <main className="TodoWrapper">
      {itemsToDisplay.length ? itemsToDisplay : <NoItems />}
    </main>
  )
}
