import React, { Component, createContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { findItemInState, randomColor } from './utilities/utilities'

export const TodoContext = createContext()

class TodoProvider extends Component {
  constructor (props) {
    super(props)
    this.server = {
      items: 'http://localhost:27018/api/items/',
      folders: 'http://localhost:27018/api/folders/'
    }
    this.state = {
      // Values
      items: [],
      folders: [],
      openFolder: null,
      openItem: null,
      markedForDelete: false,
      errors: [],
      loaded: 0,
      // Actions
      setMarkedForDelete: this.setMarkedForDelete,
      toggleTodoComplete: this.toggleTodoComplete,
      addTodoItem: this.addTodoItem,
      removeTodoItem: this.removeTodoItem,
      removeFolder: this.removeFolder,
      setOpenFolder: this.setOpenFolder,
      createFolder: this.createFolder,
      updateFolder: this.updateFolder,
      setOpenItem: this.setOpenItem,
      updateItem: this.updateItem
    }
  }

  /// Actions ///

  componentDidMount () {
    // Set items
    axios
      .get(this.server.items)
      .then(response => {
        this.setState({ items: response.data })
        this.setState({ loaded: this.state.loaded + 1 })
      })
      .catch(error => {
        this.setState({
          errors: [{ message: error }]
        })
      })

    // Set folders
    axios
      .get(this.server.folders)
      .then(response => {
        this.setState({ folders: response.data })
        this.setState({ loaded: this.state.loaded + 1 })
      })
      .catch(error => {
        this.setState({
          errors: [{ message: error }]
        })
      })
  }

  static propTypes = {
    children: PropTypes.object
  }

  setOpenItem = itemID => {
    this.setState({
      openItem: itemID
    })
  }

  setOpenFolder = folderID => {
    this.setState({
      openFolder: folderID
    })
  }

  setMarkedForDelete = status => {
    this.setState({
      markedForDelete: status
    })
  }

  addTodoItem = newItemText => {
    const now = new Date()

    // DB update
    axios
      .post(this.server.items, {
        text: newItemText,
        folder: this.state.openFolder,
        completed: false,
        creationStamp: now.toLocaleString('en-GB')
      })
      .then(response => {
        const newItem = response.data.todo

        // State update
        this.setState({ items: [...this.state.items, newItem] })
      })
      .catch(error => {
        this.setState({
          errors: [{ message: error }]
        })
      })
  }

  toggleTodoComplete = todoID => {
    let [target] = this.state.items.filter(item => item._id === todoID)
    let newCompletedStatus = !target.completed

    // State update
    this.setState(prevState => {
      return prevState.items.map(item => {
        if (todoID === item._id) item.completed = newCompletedStatus
        return item
      })
    })

    // DB update
    axios
      .patch(`${this.server.items}update-status/?id=${todoID}`, {
        completed: newCompletedStatus
      })
      .catch(error => {
        this.setState({
          errors: [{ message: error }]
        })
      })
  }

  createFolder = newFolderName => {
    // DB update
    axios
      .post(this.server.folders, {
        name: newFolderName,
        color: randomColor()
      })
      .then(response => {
        const newFolder = response.data.folder

        // State update
        this.setState({ folders: [...this.state.folders, newFolder] })
      })
      .catch(error => {
        this.setState({
          errors: [{ message: error }]
        })
      })
  }

  removeTodoItem = itemID => {
    // Finds the related ID inside state, of clicked item
    const targeted = findItemInState(itemID, this.state.items)

    // Returns a new array of todolist items without the ID of the clicked item
    const newItems = this.state.items.filter(item => item._id !== targeted._id)

    // Sets new state containing the new items
    this.setState({
      items: [...newItems],
      openItem: null
    })

    // DB update
    axios.delete(`${this.server.items}?id=${itemID}`).catch(error => {
      this.setState({
        errors: [{ message: error }]
      })
    })
  }

  removeFolder = folderID => {
    this.setState(prevState => {
      // Finding and removing targeted folder from state
      prevState.folders = prevState.folders.filter(
        prevFolder => prevFolder._id !== folderID
      )

      // Finding and removing all items in that folder
      prevState.items = prevState.items.filter(
        prevItem => prevItem.folder !== folderID
      )

      // Returning to main overview of tasks
      prevState.openFolder = null
      prevState.openItem = null
      return prevState.folders
    })

    // DB update - delete item from DB
    axios.delete(`${this.server.folders}?id=${folderID}`).catch(error => {
      this.setState({
        errors: [{ message: error }]
      })
    })
  }

  updateFolder = (selectedID, newName) => {
    // TODO: Make into a receiver of tasks (reducer?)
    this.setState(prevState => {
      const targetedFolder = {
        _id: selectedID,
        name: newName
      }

      // Return complete folder object matching selectedID
      let [foundFolder] = prevState.folders.filter(prevFolder => {
        return prevFolder._id === targetedFolder._id
      })

      // Renaming the found folder with the asked name
      foundFolder.name = targetedFolder.name

      // Inserting object with updated name into new array
      const updatedFolders = prevState.folders.map(prevFolder => {
        if (foundFolder === prevFolder) {
          foundFolder = prevFolder
        }
        return prevFolder
      })

      // Update existing folders with array of new folders (with renamed folder)
      prevState.folders = updatedFolders
      return prevState.folders
    })

    // DB update
    axios
      .patch(`${this.server.folders}update-name/?id=${selectedID}`, {
        name: newName
      })
      .catch(error => {
        this.setState({
          errors: [{ message: error }]
        })
      })
  }

  updateItem = (task, requestedItem, newItemText) => {
    if (task === 'CHANGE_ITEM_FOLDER') {
      this.setState(prevState => {
        const updatedItems = prevState.items.map(item => {
          // Matches item with the ID of the open item
          if (item._id === this.state.openItem) {
            item.folder = requestedItem._id
            console.log('yes')
          }
          return item
        })
        prevState.items = updatedItems
        return prevState
      })

      // DB update
      axios
        .patch(`${this.server.items}update-folder/?id=${this.state.openItem}`, {
          folder: requestedItem._id
        })
        .catch(error => {
          this.setState({
            errors: [{ message: error }]
          })
        })
    }

    if (task === 'UPDATE_ITEM_TEXT') {
      // State update
      this.setState(prevState => {
        const updatedItems = prevState.items.map(item => {
          if (item._id === requestedItem) {
            item.text = newItemText
          }
          return item
        })
        prevState.items = updatedItems
        return prevState
      })

      // DB update
      axios
        .patch(`${this.server.items}update-text/?id=${this.state.openItem}`, {
          text: newItemText
        })
        .catch(error => {
          this.setState({
            errors: [{ message: error }]
          })
        })
    }
  }

  render () {
    return (
      <TodoContext.Provider value={this.state}>
        {this.props.children}
      </TodoContext.Provider>
    )
  }
}

export default TodoProvider
