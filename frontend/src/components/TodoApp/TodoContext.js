import React, { Component, createContext } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import PropTypes from 'prop-types'
import {
  findItemInState,
  randomColor,
  findFromID
} from '../../utilities/utilities'

export const TodoContext = createContext()

class TodoProvider extends Component {
  constructor (props) {
    super(props)
    this.server = {
      items: 'http://localhost:4000/api/items/',
      folders: 'http://localhost:4000/api/folders/',
      header: {
        headers: {
          'x-access-token': Cookies.get('x-access-token'),
          'x-user-id': Cookies.get('x-user-id')
        }
      }
    }
    this.state = {
      // Values
      items: [],
      folders: [],
      viewItems: 'all',
      showCompleted: true,
      showOptions: false,
      openFolder: null,
      openItem: null,
      markedForDelete: false,
      errors: [],

      // Actions
      addTodoItem: this.addTodoItem,
      removeTodoItem: this.removeTodoItem,
      createFolder: this.createFolder,
      removeFolder: this.removeFolder,
      updateFolder: this.updateFolder,
      updateItem: this.updateItem,
      logOut: this.logOut,

      // Only state updates
      setShowOptions: status => this.setState({ showOptions: status }),
      setShowCompleted: status => this.setState({ showCompleted: status }),
      setOpenItem: itemID => this.setState({ openItem: itemID }),
      setOpenFolder: folderID => this.setState({ openFolder: folderID }),
      setItemView: view => this.setState({ viewItems: view }),
      setMarkedForDelete: status => this.setState({ markedForDelete: status }),

      // Initialization (after logging in)
      setInit: {
        folders: () => {
          axios
            .get(this.server.folders, this.server.header)
            .then(({ data }) => this.setState({ folders: data }))
            .catch(error => {
              this.setState({ errors: [...this.state.errors, error.message] })
            })
        },
        items: () => {
          axios
            .get(this.server.items, this.server.header)
            .then(({ data }) => this.setState({ items: data }))
            .catch(error => {
              this.setState({ errors: [...this.state.errors, error.message] })
            })
        }
      }
    }
  }

  /// Actions ///
  addTodoItem = newItemText => {
    const now = new Date()

    // DB update
    axios
      .post(
        this.server.items,
        {
          ownerID: Cookies.get('x-user-id'),
          text: newItemText,
          folder: this.state.openFolder,
          completed: false,
          important: false,
          creationStamp: now.toLocaleString('en-GB')
        },
        this.server.header
      )
      .then(response => {
        const newItem = response.data.todo

        // State update
        this.setState({ items: [...this.state.items, newItem] })
      })
      .catch(error => {
        this.setState({
          errors: [...this.state.errors, error.message]
        })
      })
  }

  createFolder = newFolderName => {
    // DB update
    axios
      .post(
        this.server.folders,
        {
          ownerID: Cookies.get('x-user-id'),
          name: newFolderName,
          color: randomColor()
        },
        this.server.header
      )
      .then(response => {
        const newFolder = response.data.folder

        // State update
        this.setState({ folders: [...this.state.folders, newFolder] })
      })
      .catch(error => {
        this.setState({
          errors: [...this.state.errors, error.message]
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
    axios
      .delete(`${this.server.items}?id=${itemID}`, this.server.header)
      .catch(error => {
        this.setState({
          errors: [...this.state.errors, error.message]
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
      return prevState
    })

    // DB update - delete item from DB
    axios
      .delete(`${this.server.folders}?id=${folderID}`, this.server.header)
      .catch(error => {
        this.setState({
          errors: [...this.state.errors, error.message]
        })
      })
  }

  updateFolder = (task, selectedID, newName) => {
    switch (task) {
      case 'UPDATE_FOLDER_NAME':
        this.setState(prevState => {
          const targetedFolder = {
            _id: selectedID,
            name: newName
          }

          let foundFolder = findFromID.folder(selectedID, this.state.folders)
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
          .patch(
            `${this.server.folders}update-name/?id=${selectedID}`,
            { name: newName },
            this.server.header
          )
          .catch(error => {
            this.setState({ errors: [...this.state.errors, error.message] })
          })
        break
      default:
        break
    }
  }

  updateItem = (task, requestedItem, updatedContent) => {
    switch (task) {
      case 'CHANGE_ITEM_FOLDER': {
        this.setState(prevState => {
          const updatedItems = prevState.items.map(item => {
            // Matches item with the ID of the open item
            if (item._id === this.state.openItem) {
              item.folder = requestedItem._id
            }
            return item
          })
          prevState.items = updatedItems
          return prevState
        })

        // DB update
        axios
          .patch(
            `${this.server.items}update-folder/?id=${this.state.openItem}`,
            { folder: requestedItem._id },
            this.server.header
          )
          .catch(error => {
            this.setState({ errors: [...this.state.errors, error.message] })
          })
        break
      }

      case 'CHANGE_ITEM_FOLDER_DND': {
        // requestedItem = item id (not folder id for item)
        // updatedContent = target folder ID
        const movedItem = findFromID.item(requestedItem, this.state.items)
        this.setState(prevState => {
          const updatedItems = prevState.items.map(item => {
            if (item._id === movedItem._id) {
              item.folder = updatedContent
            }
            return item
          })
          prevState.items = updatedItems
          return prevState
        })

        // DB update
        axios
          .patch(
            `${this.server.items}update-folder/?id=${movedItem._id}`,
            { folder: updatedContent },
            this.server.header
          )
          .catch(error => {
            this.setState({ errors: [...this.state.errors, error.message] })
          })
        break
      }

      case 'TOGGLE_COMPLETE': {
        let target = findFromID.item(requestedItem, this.state.items)
        let newCompletedStatus = !target.completed

        // State update
        this.setState(prevState => {
          return prevState.items.map(item => {
            if (requestedItem === item._id) item.completed = newCompletedStatus
            return item
          })
        })

        // DB update
        axios
          .patch(
            `${this.server.items}update-status/?id=${requestedItem}`,
            {
              completed: newCompletedStatus
            },
            this.server.header
          )
          .catch(error => {
            this.setState({
              errors: [...this.state.errors, error.message]
            })
          })
        break
      }
      case 'UPDATE_ITEM_TEXT': {
        // State update
        this.setState(prevState => {
          const updatedItems = prevState.items.map(item => {
            if (item._id === requestedItem) {
              item.text = updatedContent
            }
            return item
          })
          prevState.items = updatedItems
          return prevState
        })

        // DB update
        axios
          .patch(
            `${this.server.items}update-text/?id=${this.state.openItem}`,
            { text: updatedContent },
            this.server.header
          )
          .catch(error => {
            this.setState({ errors: [...this.state.errors, error.message] })
          })
        break
      }

      case 'TOGGLE_ITEM_IMPORTANT': {
        let item = findFromID.item(requestedItem, this.state.items)
        let newStatus = !item.important

        // State update
        this.setState(prevState => {
          const updatedItems = prevState.items.map(item => {
            if (item._id === requestedItem) {
              item.important = newStatus
            }
            return item
          })
          return updatedItems
        })

        // DB update
        axios
          .patch(
            `${this.server.items}update-important/?id=${requestedItem}`,
            { important: newStatus },
            this.server.header
          )
          .catch(error => {
            this.setState({
              errors: [...this.state.errors, error.message]
            })
          })
        break
      }
      default:
        break
    }
  }

  static propTypes = {
    children: PropTypes.object
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
