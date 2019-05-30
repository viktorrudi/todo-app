import React, { Component } from 'react'

class Folder extends Component {
  render() {
    const type = 'Folder'
    const color = this.props.color
    return (
      <div className={type} onMouseOver={this.handleHover} onMouseLeave={this.handleHover}>
        <span className={`${type}--icon`} style={{ backgroundColor: color }} />
        <p className={`${type}--name`}>{this.props.name}</p>
        <span className={`${type}--badge`}>3</span>
        <span className={`${type}--delete`}>x</span>
      </div>
    )
  }
}

export default Folder
