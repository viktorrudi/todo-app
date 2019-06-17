import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propTypeForItems, propTypeForFolders } from '../../../../../proptypes'
import './ItemFooter.scss'

class ItemFooter extends Component {
  static propTypes = {
    folderStyle: PropTypes.object,
    timeCreated: propTypeForItems.timeCreated,
    folderName: propTypeForFolders.name
  }
  render () {
    const type = 'TodoItem'
    return (
      <div className={`${type}__footer`}>
        <div
          className={`${type}__footer--folder`}
          style={this.props.folderStyle}
        >
          {this.props.folderName}
        </div>
        <div className={`${type}__footer--time`}>{this.props.timeCreated}</div>
      </div>
    )
  }
}

export default ItemFooter
