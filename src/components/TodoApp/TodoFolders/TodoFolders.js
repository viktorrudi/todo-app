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
    console.log(newFolder)
    this.setState({
      folders: [...this.state.folders, newFolder],
    })
    console.log(this.state.folders)
  }

  render() {
    const allItemsCount = this.props.items.length
    const type = 'TodoSidebar'
    return (
      <aside className={type}>
        <h3>Folders</h3>
        <CreateFolder folders={this.state.folders} createFolder={this.createFolder} />
        <div className={`${type}--seeAllFolders`} onClick={this.handleResetFolder}>
          See All {allItemsCount} items
        </div>
        <Folders getSelectedFolder={this.props.getSelectedFolder} folders={this.state.folders} />
      </aside>
    )
  }
}

export default TodoFolders
