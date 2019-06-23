import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TodoContext } from '../../../TodoContext'
import Folders from './Folders/Folders'
import CreateFolder from './CreateFolder/CreateFolder'
import { MdFolder } from 'react-icons/md'
import './TodoFolders.scss'

class TodoFolders extends Component {
  static contextType = TodoContext
  static propTypes = {
    getSelectedFolder: PropTypes.func
  }

  render () {
    const type = 'TodoFolders'
    const { items, folders } = this.context
    return (
      <aside className={type}>
        <h2>
          ToD👌 <small>v.1.0.0</small>
        </h2>
        <div
          className={`${type}--seeAllFolders`}
          onClick={() => this.context.setOpenFolder(null)}
        >
          See All <strong>{items.length}</strong> items
        </div>

        <h3>
          <MdFolder /> Folders
        </h3>
        <Folders folders={folders} items={items} />
        <CreateFolder folders={folders} />
      </aside>
    )
  }
}

export default TodoFolders
