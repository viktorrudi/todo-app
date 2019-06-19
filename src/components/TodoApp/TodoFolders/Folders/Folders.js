import React, { Component, Fragment } from 'react'
import { TodoContext } from '../../../../TodoContext'
import Folder from './Folder'
import './Folders.scss'

class Folders extends Component {
  static contextType = TodoContext

  findItemCount = folder => {
    let count = 0
    this.context.items.map(item => {
      if (item.folder === folder.id) {
        count++
      }
      return false
    })
    return count
  }

  render () {
    return (
      <Fragment>
        <div className="Folders">
          {this.context.folders.map(folder => (
            <Folder
              key={folder.id}
              folder={folder}
              itemCount={this.findItemCount(folder)}
            />
          ))}
        </div>
      </Fragment>
    )
  }
}

export default Folders
