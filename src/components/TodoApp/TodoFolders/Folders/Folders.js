import React, { Component, Fragment } from 'react'
import Folder from './Folder'
import './Folders.scss'

class Folders extends Component {
  constructor(props) {
    super(props)
    this.findItemCount = this.findItemCount.bind(this)
  }

  findItemCount(folder) {
    let count = 0
    this.props.items.map(item => {
      if (item.folder === folder.id) {
        count++
      }
      return false
    })
    return count
  }
  render() {
    let folders = this.props.folders.map(folder => (
      <Folder
        key={folder.id}
        folder={folder}
        getSelectedFolder={this.props.getSelectedFolder}
        allFolders={this.props.folders}
        itemCount={this.findItemCount(folder)}
      />
    ))
    return (
      <Fragment>
        <div className="Folders">{folders}</div>
      </Fragment>
    )
  }
}

export default Folders
