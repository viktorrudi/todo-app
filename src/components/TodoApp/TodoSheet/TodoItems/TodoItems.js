import React, { useContext } from 'react'
import TodoItem from './TodoItem'
import NoItems from './NoItems/NoItems'
import './TodoItem.scss'
import _ from 'lodash'
import { findItemsInFolder } from '../../../utilities/utilities'
import { TodoContext } from '../../../../TodoContext'

export default function TodoItems(props) {
  // Todocontext
  const [todo, setTodo] = useContext(TodoContext)

  const findItemFolder = itemFolderID => {
    const allFolders = todo.folders
    let result = allFolders.filter(folder => folder.id === itemFolderID)
    return result[0]
  }

  // Finds and returns todo items associated with the folder
  let openedFolder
  if (props.openFolder) {
    openedFolder = findItemsInFolder(todo.items, props.openFolder)
  }
  const dateFilter = _.sortBy(openedFolder || todo.items, item => {
    return new Date(item.creationStamp)
  }).reverse()
  // Sorted by having uncompleted tasks first, and completed at the end
  let completedSorted = _.sortBy(dateFilter, ['completed'])

  let allItems = completedSorted.map(item => (
    <TodoItem
      key={item.id}
      item={item}
      folder={findItemFolder(item.folder)}
      toggleCompletedTodo={props.toggleCompletedTodo}
      clickedItem={props.clickedItem}
    />
  ))

  return <main className="TodoWrapper">{allItems.length ? allItems : <NoItems />}</main>
}
