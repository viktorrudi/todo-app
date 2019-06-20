import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
    openFolder: PropTypes.number,
    folders: PropTypes.array
  }

  findOpenFolderName = openFolderID => {
    const found = this.props.folders.filter(folder => {
      return openFolderID === folder.id
    })
    return found[0].name
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Updates state to contain currently selected folder (from props)
    if (prevProps.openFolder !== this.props.openFolder) {
      this.setState({
        openFolder: {
          id: this.props.openFolder,
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
    this.context.updateFolder(this.props.openFolder, this.state.openFolder.name)
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
          <div
            className={`${type}__folder--delete`}
            onClick={() => this.context.removeFolder(this.context.openFolder)}
          >
            Delete
          </div>
        </span>
      </div>
    )
  }
}

export default ListHeader
