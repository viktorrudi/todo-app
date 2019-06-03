import React, { Component } from 'react'
import './ItemFooter.scss'

class ItemFooter extends Component {
  render() {
    // console.log('props.folderName', this.props.folderName)
    const type = 'TodoItem'
    return (
      <div className={`${type}__footer`}>
        <div className={`${type}__footer--folder`} style={this.props.folderStyle}>
          {this.props.folderName}
        </div>
        <div className={`${type}__footer--time`}>{this.props.timeCreated}</div>
      </div>
    )
  }
}

export default ItemFooter
