import React, { Component, createContext } from 'react'
import PropTypes from 'prop-types'
import { findItemInState, randomColor } from './components/utilities/utilities'
import * as DBtodoItems from './database/todo-items.json'
import * as DBtodoFolders from './database/todo-folders.json'

export const TodoContext = createContext()

class TodoProvider extends Component {
  constructor (props) {
    super(props)
    this.state = {
      items: DBtodoItems.default,
      folders: DBtodoFolders.default,
      openFolder: null,
      openItem: null,
      toggleTodoComplete: this.toggleTodoComplete,
      addTodoItem: this.addTodoItem,
      removeTodoItem: this.removeTodoItem,
      removeFolder: this.removeFolder,
      setOpenFolder: this.setOpenFolder,
      createFolder: this.createFolder,
      updateFolder: this.updateFolder,
      setOpenItem: this.setOpenItem
    }
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

  toggleTodoComplete = todoID => {
    this.setState(prevState => {
      const updatedItems = prevState.items.map(item => {
        if (item.id === todoID) {
          item.completed = !item.completed
        }
        return item
      })
      prevState.items = updatedItems
      return prevState.items
    })
  }

  createFolder = newFolderName => {
    const newFolder = {
      id: this.state.folders.length + 1,
      name: newFolderName,
      color: randomColor()
    }
    this.setState({
      folders: [...this.state.folders, newFolder]
    })
  }

  addTodoItem = newItemText => {
    const newItem = {
      id: this.state.items.length + 1,
      text: newItemText,
      folder: this.state.openFolder,
      completed: false
      // TODO:
      // timeCreated: moment().format('HH:mm'),
      // dateCreated: moment().format('DD-MM-YYYY'),
      // creationStamp: nowStamp
    }

    this.setState({
      items: [...this.state.items, newItem]
    })
  }

  removeTodoItem = itemID => {
    // Finds the related ID inside state, of clicked item
    const targeted = findItemInState(itemID, this.state.items)
    // Returns a new array of todolist items without the ID of the clicked item
    const newItems = this.state.items.filter(item => item.id !== targeted.id)
    // Sets new state containing the new items
    this.setState({
      items: [...newItems],
      openItem: null
    })
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
      return prevState.folders
    })
  }

  updateFolder = (selectedID, newName) => {
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

  render () {
    return (
      <TodoContext.Provider value={this.state}>
        {this.props.children}
      </TodoContext.Provider>
    )
  }
}

export default TodoProvider

// export const TodoProvider = props => {
//   const addTodoItem = item => {
//     console.log('addtodo', item)
//   }

//   const [todo, setTodo] = useState({
//     items: DBtodoItems.default,
//     folders: DBtodoFolders.default,
//     openFolder: null,
//     addTodoItem: addTodoItem
//   })

//   return (
//     <TodoContext.Provider value={[todo, setTodo]}>
//       {props.children}
//     </TodoContext.Provider>
//   )
// }
