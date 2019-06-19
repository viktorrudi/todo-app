import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import TodoItem from './TodoItem'
import NoItems from './NoItems/NoItems'
import './TodoItem.scss'
import _ from 'lodash'
import { findItemsInFolder } from '../../../utilities/utilities'
import { TodoContext } from '../../../../TodoContext'

export default function TodoItems (props) {
  // Todocontext
  const context = useContext(TodoContext)

  const findItemFolder = itemFolderID => {
    const allFolders = context.folders
    let result = allFolders.filter(folder => folder.id === itemFolderID)
    return result[0]
  }

  // Finds and returns todo items associated with the folder
  let openedFolder
  if (props.openFolder) {
    openedFolder = findItemsInFolder(context.items, props.openFolder)
  }
  const dateFilter = _.sortBy(openedFolder || context.items, item => {
    return new Date(item.creationStamp)
  }).reverse()
  // Sorted by having uncompleted tasks first, and completed at the end
  let completedSorted = _.sortBy(dateFilter, ['completed'])

  let allItems = completedSorted.map(item => (
    <TodoItem
      key={item.id}
      openitem={item}
      openfolder={findItemFolder(item.folder)}
      toggleCompletedTodo={props.toggleCompletedTodo}
      clickedItem={props.clickedItem}
    />
  ))

  return (
    <main className="TodoWrapper">
      {allItems.length ? allItems : <NoItems />}
    </main>
  )
}

TodoItems.propTypes = {
  toggleCompletedTodo: PropTypes.func,
  clickedItem: PropTypes.func,
  openFolder: PropTypes.object
}
