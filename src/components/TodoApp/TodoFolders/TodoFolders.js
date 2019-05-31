import React, { Component } from 'react'
import Folders from './Folders/Folders'
import CreateFolder from './CreateFolder/CreateFolder'
import './TodoFolders.scss'
import * as DBtodoFolders from '../../../database/todo-folders.json'

class TodoFolders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      folders: DBtodoFolders.default,
    }
    this.handleResetFolder = this.handleResetFolder.bind(this)
    this.createFolder = this.createFolder.bind(this)
  }
  handleResetFolder() {
    // Resets folder view - shows all folders
    this.props.getSelectedFolder(null)
  }

  createFolder(newFolder) {
    // Expecting object in folder argument
    // Adds new folder to state
    this.setState({
      folders: [...this.state.folders, newFolder],
    })
    // TODO: Save folder in DB
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
        <CreateFolder folders={this.state.folders} createFolder={this.createFolder} />
        <Folders
          getSelectedFolder={this.props.getSelectedFolder}
          folders={this.state.folders}
          items={this.props.items}
        />
      </aside>
    )
  }
}

export default TodoFolders
