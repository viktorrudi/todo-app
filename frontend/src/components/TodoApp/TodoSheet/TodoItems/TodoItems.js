import React, { useContext } from 'react'
import TodoItem from './TodoItem'
import NoItems from './NoItems/NoItems'
import './TodoItem.scss'
import _ from 'lodash'
import { findItemsInFolder } from '../../../../utilities/utilities'
import { TodoContext } from '../../TodoContext'

export default function TodoItems () {
  const { openFolder, items, folders } = useContext(TodoContext)

  const findItemFolder = itemFolderID => {
    const [folder] = folders.filter(folder => folder._id === itemFolderID)
    return folder
  }

  // Finds and returns todo items associated with the folder
  let itemsInOpenedFolder
  if (openFolder) {
    itemsInOpenedFolder = findItemsInFolder(items, openFolder)
  }

  // Sort by date
  const dateFilter = _.sortBy(itemsInOpenedFolder || items, item => {
    return new Date(item.creationStamp)
  }).reverse()

  // Sorted by having uncompleted tasks first, and completed at the end
  let completedSorted = _.sortBy(dateFilter, ['completed'])

  let allItems = completedSorted.map(item => (
    <TodoItem key={item._id} item={item} findFolder={findItemFolder} />
  ))

  return (
    <main className="TodoWrapper">
      {allItems.length ? allItems : <NoItems />}
    </main>
  )
}
