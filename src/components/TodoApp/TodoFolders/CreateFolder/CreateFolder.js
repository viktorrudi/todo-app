import React, { Component } from 'react'
import { randomColor } from '../../../utilities/utilities'
import './CreateFolder.scss'

class CreateFolder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newFolderName: '',
    }
    this.handleNewFolderInput = this.handleNewFolderInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleNewFolderInput(e) {
    this.setState({
      newFolderName: e.target.value,
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    const newFolder = {
      id: this.props.folders.length + 1,
      name: this.state.newFolderName,
      color: randomColor(),
    }
    // TODO: Function to lift new object to change global state
    this.props.createFolder(newFolder)
    // TODO: Insert new folder into DB
    this.setState({
      newFolderName: '',
    })
  }
  render() {
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
