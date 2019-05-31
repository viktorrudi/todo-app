import React, { Component } from 'react'

class Folder extends Component {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    this.props.getSelectedFolder(parseInt(e.target.id))
  }
  render() {
    const type = 'Folder'
    const color = this.props.color
    return (
      <div
        className={type}
        onMouseOver={this.handleHover}
        onMouseLeave={this.handleHover}
        onClick={this.handleClick}
        id={this.props.id}
      >
        <span className={`${type}--icon`} style={{ backgroundColor: color }} />
        <p className={`${type}--name`}>{this.props.name}</p>
        <span className={`${type}--badge`}>3</span>
        <span className={`${type}--delete`}>x</span>
      </div>
    )
  }
}

export default Folder
