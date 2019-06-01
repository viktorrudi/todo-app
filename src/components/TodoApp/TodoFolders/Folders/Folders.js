import React, { Component, Fragment } from 'react'
import Folder from './Folder'
import './Folders.scss'

class Folders extends Component {
  render() {
    let folders = this.props.folders.map(folder => (
      <Folder
        key={folder.id}
        folder={folder}
        getSelectedFolder={this.props.getSelectedFolder}
        allFolders={this.props.folders}
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
