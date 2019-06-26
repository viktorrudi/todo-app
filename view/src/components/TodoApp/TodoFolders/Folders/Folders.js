import React, { Component } from 'react'
import { TodoContext } from '../../TodoContext'
import Folder from './Folder'
import './Folders.scss'

class Folders extends Component {
  static contextType = TodoContext

  findItemCount = folder => {
    let count = 0
    this.context.items.map(item => {
      if (item.folder === folder._id) {
        count++
      }
      return false
    })
    return count
  }

  render () {
    return (
      <>
        <div className="Folders">
          {this.context.folders.map(folder => (
            <Folder
              key={folder._id}
              folder={folder}
              open={folder._id === this.context.openFolder}
              itemCount={this.findItemCount(folder)}
            />
          ))}
        </div>
      </>
    )
  }
}

export default Folders
