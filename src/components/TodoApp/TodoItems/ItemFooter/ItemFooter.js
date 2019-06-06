import React, { Component } from 'react'
import './ItemFooter.scss'

class ItemFooter extends Component {
  render() {
    const type = 'TodoItem'
    return (
      <div className={`${type}__footer`} id={this.props.id}>
        <div className={`${type}__footer--folder`} style={this.props.folderStyle}>
          {this.props.folderName}
        </div>
        <div className={`${type}__footer--time`}>{this.props.timeCreated}</div>
      </div>
    )
  }
}

export default ItemFooter
