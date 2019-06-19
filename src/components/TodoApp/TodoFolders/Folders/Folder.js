import React, { Component } from 'react'
import { TodoContext } from '../../../../TodoContext'

class Folder extends Component {
  static contextType = TodoContext

  handleClick = e => {
    this.context.setOpenFolder(parseInt(e.target.id))
  }
  render () {
    const type = 'Folder'
    const color = this.props.folder.color

    return (
      <div
        className={type}
        onMouseOver={this.handleHover}
        onMouseLeave={this.handleHover}
        onClick={this.handleClick}
        id={this.props.folder.id}
      >
        <span className={`${type}--icon`} style={{ backgroundColor: color }} />
        <p className={`${type}--name`}>{this.props.folder.name}</p>
        <span className={`${type}--badge`}>{this.props.itemCount}</span>
        <span className={`${type}--delete`}>x</span>
      </div>
    )
  }
}

export default Folder
