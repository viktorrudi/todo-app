import React, { Component } from 'react'
import { TodoContext } from '../../TodoContext'
import './CreateFolder.scss'

class CreateFolder extends Component {
  constructor (props) {
    super(props)
    this.state = {
      newFolderName: ''
    }
  }

  static contextType = TodoContext

  handleNewFolderInput = e => {
    this.setState({
      newFolderName: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault()

    this.context.createFolder(this.state.newFolderName)

    this.setState({
      newFolderName: ''
    })
  }

  render () {
    const type = 'CreateFolder'
    return (
      <form className={type} onSubmit={this.handleSubmit}>
        <input
          className={`${type}--addFolderField`}
          type="text"
          placeholder="Create folder"
          onChange={this.handleNewFolderInput}
          value={this.state.newFolderName}
        />
        <input type="submit" value="" hidden />
      </form>
    )
  }
}

export default CreateFolder
