import React, { Component } from 'react'
import Folders from './Folders/Folders'
import './TodoFolders.scss'

class TodoFolders extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    // Resets folder view - shows all folders
    this.props.getSelectedFolder(null)
  }
  render() {
    const allItemsCount = this.props.itemsCount
    const type = 'TodoSidebar'
    return (
      <aside className={type}>
        <h3>Folders</h3>
        <div className={`${type}--createFolder`}>Create folder</div>
        <div className={`${type}--seeAllFolders`} onClick={this.handleClick}>
          See All {allItemsCount} items
        </div>
        <Folders getSelectedFolder={this.props.getSelectedFolder} />
      </aside>
    )
  }
}

export default TodoFolders
