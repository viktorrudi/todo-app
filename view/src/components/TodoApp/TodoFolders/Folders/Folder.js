import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TodoContext } from '../../../../TodoContext'

class Folder extends Component {
  static contextType = TodoContext

  static propTypes = {
    folder: PropTypes.object,
    itemCount: PropTypes.number,
    open: PropTypes.bool
  }

  handleClick = e => {
    this.context.setOpenFolder(parseInt(e.target.id))
  }

  render () {
    const type = 'Folder'
    const { folder, open, itemCount } = this.props

    return (
      <div
        className={open ? `${type} ${type}--open` : type}
        onMouseOver={this.handleHover}
        onMouseLeave={this.handleHover}
        onClick={this.handleClick}
        id={folder.id}
      >
        <span
          className={`${type}--icon`}
          style={{ backgroundColor: folder.color }}
        />
        <p className={`${type}--name`}>{folder.name}</p>
        <span className={`${type}--badge`}>{itemCount}</span>
        <span className={`${type}--delete`}>x</span>
      </div>
    )
  }
}

export default Folder
