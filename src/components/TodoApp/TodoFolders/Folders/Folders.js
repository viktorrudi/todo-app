import React, { Component, Fragment } from 'react'
import Folder from './Folder'
import './Folders.scss'
import * as data from '../../../../database/todo-folders.json'

class Folders extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovered: false,
      folders: data.default,
    }
    this.handleHover = this.handleHover.bind(this)
  }
  handleHover(e) {
    this.setState(prevState => ({
      isHovered: !prevState.isHovered,
    }))
    console.log(e)
  }
  render() {
    const foldersData = this.state.folders
    let folders = foldersData.map(folder => (
      <Folder key={folder.id} name={folder.name} color={folder.color} />
    ))
    return (
      <Fragment>
        <div className="Folders">{folders}</div>
      </Fragment>
    )
  }
}

export default Folders
