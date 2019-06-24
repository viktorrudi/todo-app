import React, { Component, createContext } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import { findItemInState, randomColor } from './utilities/utilities'
// import * as DBtodoItems from './database/todo-items.json'
// import * as DBtodoFolders from './database/todo-folders.json'

export const TodoContext = createContext()

class TodoProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: [],
      folders: [],
      openFolder: null,
      openItem: null,
      toggleTodoComplete: this.toggleTodoComplete,
      addTodoItem: this.addTodoItem,
      removeTodoItem: this.removeTodoItem,
      removeFolder: this.removeFolder,
      setOpenFolder: this.setOpenFolder,
      createFolder: this.createFolder,
      updateFolder: this.updateFolder,
      setOpenItem: this.setOpenItem,
      updateItem: this.updateItem,
      errors: []
    }
  }

  /// ///////////////////////////////////
  componentDidMount () {
    // Set items
    axios
      .get('http://localhost:27018/api/items')
      .then(response => {
        this.setState({ items: response.data })
      })
      .catch(error => {
        this.setState({
          errors: [{ message: error }]
        })
      })

    // Set folders
    axios
      .get('http://localhost:27018/api/folders')
      .then(response => {
        this.setState({ folders: response.data })
      })
      .catch(error => {
        this.setState({
          errors: [{ message: error }]
        })
      })
  }
  /// ///////////////////////////////////

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
      .patch(`http://localhost:27018/api/toggle-complete-item/?id=${todoID}`, {
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
      .post('http://localhost:27018/api/folders/', {
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

  addTodoItem = newItemText => {
    const now = new Date()

    // DB update
    axios
      .post('http://localhost:27018/api/items/', {
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
    axios.delete(`http://localhost:27018/api/items/?id=${itemID}`)
  }

  removeFolder = folderID => {
    this.setState(prevState => {
      // Finding and removing targeted folder from state
      prevState.folders = prevState.folders.filter(
        prevFolder => prevFolder.id !== folderID
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

    // DB update
    axios.delete(`http://localhost:27018/api/folders/?id=${folderID}`)
  }

  updateFolder = (selectedID, newName) => {
    // TODO: Make into a receiver of tasks (reducer?)
    this.setState(prevState => {
      const targetedFolder = {
        id: selectedID,
        name: newName
      }

      // Return complete folder object matching selectedID
      let foundFolder = prevState.folders.filter(prevFolder => {
        return prevFolder.id === targetedFolder.id
      })

      // Renaming the found folder with the asked name
      foundFolder[0].name = targetedFolder.name

      // Inserting object with updated name into new array
      const updatedFolders = prevState.folders.map(prevFolder => {
        if (foundFolder[0] === prevFolder) {
          foundFolder = prevFolder
        }
        return prevFolder
      })
      // Update existing folders with array of new folders (with renamed folder)
      prevState.folders = updatedFolders
      return prevState.folders
    })
  }

  updateItem = (task, requestedItem, newItemText) => {
    if (task === 'CHANGE_ITEM_FOLDER') {
      this.setState(prevState => {
        const updatedItems = prevState.items.map(item => {
          // Matches item with the open item ID
          if (item.id === this.state.openItem) {
            item.folder = requestedItem.id
          }
          return item
        })
        prevState.items = updatedItems
        return prevState
      })
    }

    if (task === 'UPDATE_ITEM_TEXT') {
      this.setState(prevState => {
        const updatedItems = prevState.items.map(item => {
          if (item.id === requestedItem) {
            item.text = newItemText
          }
          return item
        })
        prevState.items = updatedItems
        return prevState
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
