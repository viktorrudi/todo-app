import React, { useContext } from 'react'
import TodoItem from './TodoItem'
import NoItems from './NoItems/NoItems'
import './TodoItem.scss'
import _ from 'lodash'
import { TodoContext } from '../../TodoContext'

export default function TodoItems () {
  const { viewItems, openFolder, items, folders } = useContext(TodoContext)

  let importantItems = items.filter(item => item.important)
  console.log('imp', importantItems)
  let itemsInFolder = items.filter(item => item.folder === openFolder)
  console.log('opn', itemsInFolder)

  let selectedView
  if (viewItems === 'all') {
    selectedView = items
  }
  if (viewItems === 'important') {
    selectedView = items.filter(item => item.important)
  }
  if (viewItems === 'folder') {
    selectedView = items.filter(item => item.folder === openFolder)
  }

  const findItemFolder = itemFolderID => {
    const [folder] = folders.filter(folder => folder._id === itemFolderID)
    return folder
  }

  // Sorting
  selectedView = _.sortBy(selectedView || items, item => {
    return new Date(item.creationStamp)
  })
  selectedView = _.sortBy(selectedView, ['important']).reverse()
  selectedView = _.sortBy(selectedView, ['completed'])

  let itemsToDisplay = selectedView.map(item => (
    <TodoItem key={item._id} item={item} findFolder={findItemFolder} />
  ))

  return (
    <main className="TodoWrapper">
      {itemsToDisplay.length ? itemsToDisplay : <NoItems />}
    </main>
  )
}
