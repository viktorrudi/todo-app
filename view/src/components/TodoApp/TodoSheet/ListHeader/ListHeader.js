import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { TodoContext } from '../../../../TodoContext'
import './ListHeader.scss'
import FolderOptions from './FolderOptions/FolderOptions'

class ListHeader extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openFolder: {
        _id: this.props.openFolder,
        name: this.props.openFolder
          ? this.findOpenFolderName(this.props.openFolder)
          : null
      }
    }
  }

  static contextType = TodoContext
  static propTypes = {
    openFolder: PropTypes.string,
    folders: PropTypes.array
  }

  findOpenFolderName = openFolderID => {
    const [found] = this.props.folders.filter(
      folder => openFolderID === folder._id
    )
    return found.name
  }

  componentDidUpdate = prevProps => {
    // Updates state to contain currently selected folder (from props)
    if (prevProps.openFolder !== this.props.openFolder) {
      this.setState({
        openFolder: {
          _id: this.props.openFolder,
          name: this.findOpenFolderName(this.props.openFolder)
        }
      })
    }
  }

  handleMarkForDelete = () => {
    this.setState({
      markedForDelete: !this.state.markedForDelete
    })
  }

  handleChange = e => {
    this.setState({
      openFolder: {
        name: e.target.value
      }
    })
    if (this.context.markedForDelete) {
      this.context.setMarkedForDelete(false)
    }
  }

  handleSubmit = e => {
    this.context.updateFolder(this.props.openFolder, this.state.openFolder.name)
    e.preventDefault()
  }

  render () {
    const { openFolder, markedForDelete } = this.state
    const type = 'ListHeader'

    return (
      <div className={type}>
        <form onSubmit={this.handleSubmit}>
          <input
            id={openFolder._id}
            className={`${type}__folder--input`}
            type="text"
            value={openFolder.name}
            onChange={this.handleChange}
            autoComplete="off"
          />
        </form>
        <FolderOptions
          openFolder={openFolder._id}
          handleMarkForDelete={this.handleMarkForDelete}
          markForDelete={markedForDelete}
        />
      </div>
    )
  }
}

export default ListHeader
