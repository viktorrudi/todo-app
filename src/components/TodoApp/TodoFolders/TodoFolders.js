import React, { Component } from 'react'
import Folders from './Folders/Folders'
import CreateFolder from './CreateFolder/CreateFolder'
import './TodoFolders.scss'

class TodoFolders extends Component {
  handleResetFolder = () => {
    // Resets folder view - shows all folders
    this.props.getSelectedFolder(null)
  }

  createFolder = newFolder => {
    this.props.createFolder(newFolder)
  }

  render() {
    const allItemsCount = this.props.items.length
    const type = 'TodoSidebar'
    return (
      <aside className={type}>
        <h3>ToDo</h3>
        <div className={`${type}--seeAllFolders`} onClick={this.handleResetFolder}>
          See All {allItemsCount} items
        </div>
        <CreateFolder folders={this.props.folders} createFolder={this.createFolder} />
        <Folders
          getSelectedFolder={this.props.getSelectedFolder}
          folders={this.props.folders}
          items={this.props.items}
        />
      </aside>
    )
  }
}

export default TodoFolders
