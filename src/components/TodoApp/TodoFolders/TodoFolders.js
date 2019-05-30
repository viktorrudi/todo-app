import React, { Component } from 'react'
import Folders from './Folders/Folders'
import './TodoFolders.scss'

class TodoFolders extends Component {
  render() {
    const type = 'TodoSidebar'
    return (
      <aside className={type}>
        <h3>Folders</h3>
        <div class={`${type}--createFolder`}>Create folder</div>
        <Folders />
      </aside>
    )
  }
}

export default TodoFolders
