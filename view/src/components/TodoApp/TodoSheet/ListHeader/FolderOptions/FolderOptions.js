import React, { Component } from 'react'
import { TodoContext } from '../../../../../TodoContext'
import { MdDelete } from 'react-icons/md'

export default class FolderOptions extends Component {
  static contextType = TodoContext

  toggleDelete = () => {
    if (this.context.markedForDelete) {
      this.context.removeFolder(this.context.openFolder)
    }
    this.context.setMarkedForDelete(true)
  }

  render () {
    const type = 'ListHeader'
    return (
      <div className={`${type}__folder--delete`} onClick={this.toggleDelete}>
        {this.context.markedForDelete ? (
          <span>Delete folder & items</span>
        ) : null}
        <MdDelete />
      </div>
    )
  }
}
