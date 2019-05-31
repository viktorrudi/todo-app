import React, { Component } from 'react'

class Folder extends Component {
  constructor(props) {
    super(props)
    this.handleHover = this.handleHover.bind(this)
    this.handleClick = this.handleClick.bind(this)
  }
  handleClick(e) {
    console.log(e)
  }
  handleHover(e) {
    console.log(e)
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
