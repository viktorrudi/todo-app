import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { propTypeForFolders } from '../../../../proptypes'
import { TodoContext } from '../../../../TodoContext'
import './ListHeader.scss'

class ListHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openFolder: {
        id: this.props.openFolder,
        name: this.props.openFolder
          ? this.findOpenFolderName(this.props.openFolder)
          : null
      }
    }
  }

  static contextType = TodoContext

  static propTypes = {
    openFolder: PropTypes.shape({ ...propTypeForFolders }),
    folders: PropTypes.object
  }

  findOpenFolderName = openFolder => {
    // FIXME: Find a cleaner solution
    const found = this.props.folders.map(folder => {
      if (openFolder === folder.id) {
        return folder.name
      }
      return null
    })
    // Only returns item string, and not an array of empty items + actual item
    const item = found.filter(folder => {
      return folder !== null
    })
    return item[0]
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Updates state to contain currently selected folder (from props)
    if (prevProps.openFolder !== this.props.openFolder) {
      this.setState({
        openFolder: {
          id: this.context.openFolder,
          name: this.findOpenFolderName(this.props.openFolder)
        }
      })
    }
  }

  handleChange = e => {
    this.setState({
      openFolder: {
        name: e.target.value
      }
    })
  }

  handleSubmit = e => {
    console.log(this.state)
    this.context.updateFolder(
      this.state.openFolder.id,
      this.state.openFolder.name
    )
    e.preventDefault()
  }

  render () {
    const type = 'ListHeader'
    return (
      <div className={type}>
        <form onSubmit={this.handleSubmit}>
          <input
            id={this.state.openFolder.id}
            className={`${type}__folder--input`}
            type="text"
            value={this.state.openFolder.name}
            onChange={this.handleChange}
            autoComplete="off"
          />
        </form>
        <span>
          <button
            className={`${type}__folder--delete`}
            onClick={() => this.context.removeFolder(this.context.openFolder)}
          >
            Delete
          </button>
        </span>
      </div>
    )
  }
}

export default ListHeader
