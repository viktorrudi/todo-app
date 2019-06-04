import React, { Component } from 'react'
import TodoItem from './TodoItem'
import ListHeader from './ListHeader/ListHeader'
import NoItems from './NoItems/NoItems'
import './TodoItem.scss'
import _ from 'lodash'
import { findItemsInFolder } from '../../utilities/utilities'

class TodoItems extends Component {
  constructor(props) {
    super(props)
    this.findItemFolder = this.findItemFolder.bind(this)
  }
  findItemFolder(itemFolderID) {
    const allFolders = this.props.folders
    let result = allFolders.filter(folder => folder.id === itemFolderID)
    return result[0]
  }

  render() {
    // Finds and returns todo items associated with the folder
    let openedFolder
    if (this.props.openFolder) {
      openedFolder = findItemsInFolder(this.props.items, this.props.openFolder)
    }
    const dateFilter = _.sortBy(openedFolder || this.props.items, item => {
      return new Date(item.creationStamp)
    }).reverse()
    // Sorted by having uncompleted tasks first, and completed at the end
    let completedSorted = _.sortBy(dateFilter, ['completed'])

    let allItems = completedSorted.map(item => (
      <TodoItem
        key={item.id}
        item={item}
        folder={this.findItemFolder(item.folder)}
        deleteTodo={this.props.deleteTodo}
        toggleCompletedTodo={this.props.toggleCompletedTodo}
      />
    ))
    console.log(allItems.length)
    return <main className="TodoWrapper">{allItems.length ? allItems : <NoItems />}</main>
  }
}

export default TodoItems
