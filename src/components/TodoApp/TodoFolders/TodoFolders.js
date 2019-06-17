import React, { Component } from 'react'
import { TodoContext } from '../../../TodoContext'
import Folders from './Folders/Folders'
import CreateFolder from './CreateFolder/CreateFolder'
import './TodoFolders.scss'

class TodoFolders extends Component {
  static contextType = TodoContext

  createFolder = newFolder => {
    this.props.createFolder(newFolder)
  }

  render () {
    const type = 'TodoSidebar'
    const { items, folders } = this.context[0]
    return (
      <aside className={type}>
        <h3>ToDo</h3>
        <div
          className={`${type}--seeAllFolders`}
          onClick={() => this.props.getSelectedFolder(null)}
        >
          See All {items.length} items
        </div>
        <CreateFolder folders={folders} createFolder={this.createFolder} />
        <Folders
          getSelectedFolder={this.props.getSelectedFolder}
          folders={folders}
          items={items}
        />
      </aside>
    )
  }
}

export default TodoFolders
