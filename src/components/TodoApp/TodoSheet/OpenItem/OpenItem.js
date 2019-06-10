import React, { Component } from 'react'
import './OpenItem.scss'

class OpenItem extends Component {
  render() {
    const type = 'OpenItem'
    const item = this.props.openItem
    return (
      <div className={type}>
        <ul className={`${type}__actions`}>
          <li className="small-btn" onClick={this.props.closeOpenedItem}>
            X
          </li>
          <li className="small-btn">D</li>
          <li className="small-btn">I</li>
          <li className="small-btn">F</li>
        </ul>
        {item.text}
      </div>
    )
  }
}

export default OpenItem
