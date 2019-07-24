import React, { useContext } from 'react'
import TodoItem from './TodoItem'
import NoItems from './NoItems/NoItems'
import './TodoItem.scss'
import _ from 'lodash'
import { TodoContext } from '../../TodoContext'

export default function TodoItems () {
  const { viewItems, showCompleted, openFolder, items } = useContext(
    TodoContext
  )

  // Toggeling the view of the items
  let selectedView
  switch (viewItems) {
    case 'all':
      const sortByFolder = items => {
        const itemsWithoutFolder = items.filter(item => item.folder === null)
        const itemsWithFolder = items
          .filter(item => item.folder !== null)
          .sort((a, b) => (a.folder > b.folder ? 1 : -1))

        // Returns a sorted array separating items with and without folders
        return [...itemsWithFolder, ...itemsWithoutFolder]
      }
      selectedView = sortByFolder(items)
      break
    case 'important':
      selectedView = items.filter(item => item.important)
      break
    case 'folder':
      selectedView = items.filter(item => item.folder === openFolder)
      break
    case 'no-completed':
      selectedView = items.filter(item => !item.completed)
      break
    default:
      break
  }

  // Toggle display of completed items
  if (!showCompleted) {
    selectedView = selectedView.filter(item => !item.completed)
  }

  // Sorting
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
