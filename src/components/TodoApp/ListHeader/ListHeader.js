import React, { Component } from 'react'
import './ListHeader.scss'

class ListHeader extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openFolder: {
        id: this.props.openFolder,
        name: this.findOpenFolderName(this.props.openFolder),
      },
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.findOpenFolderName = this.findOpenFolderName.bind(this)
  }

  findOpenFolderName(openFolder) {
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

  componentDidUpdate(prevProps, prevState) {
    // Updates state to contain currently selected folder (from props)
    if (prevProps.openFolder !== this.props.openFolder) {
      this.setState({
        openFolder: {
          id: this.props.openFolder,
          name: this.findOpenFolderName(this.props.openFolder),
        },
      })
    }
  }
  handleChange(e) {
    this.setState({
      openFolder: {
        id: this.state.openFolder.id,
        name: e.target.value,
      },
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    this.props.changeFolderName(this.state.openFolder)
  }

  handleDelete(e) {
    this.props.deleteFolder(this.state.openFolder)
  }

  render() {
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
          />
        </form>
        <span>
          <button className={`${type}__folder--delete`} onClick={this.handleDelete}>
            Delete
          </button>
        </span>
      </div>
    )
  }
}

export default ListHeader
