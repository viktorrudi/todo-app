import React, { Component } from 'react'
import { TodoContext } from '../../../../../TodoContext'
import { MdDelete } from 'react-icons/md'

export default class FolderOptions extends Component {
  constructor (props) {
    super(props)
    this.state = {
      markedForDelete: false
    }
  }

  static contextType = TodoContext

  toggleDelete = () => {
    if (this.state.markedForDelete) {
      this.context.removeFolder(this.context.openFolder)
    }
    this.setState({
      markedForDelete: true
    })
  }

  resetMark = () => {
    this.setState({
      markedForDelete: false
    })
  }

  render () {
    if (this.props.openFolder !== this.context.openFolder) {
      this.resetMark()
    }
    const type = 'ListHeader'
    return (
      <div className={`${type}__folder--delete`} onClick={this.toggleDelete}>
        {this.state.markedForDelete ? <span>Delete folder & items</span> : null}
        <MdDelete />
      </div>
    )
  }
}

// export default function FolderOptions (props) {
//   const context = useContext(TodoContext)
//   const [markedForDelete, setMarkedForDelete] = useState(false)

//   const toggleDelete = () => {
//     if (markedForDelete) {
//       context.removeFolder(context.openFolder)
//     }
//     setMarkedForDelete(true)
//   }

//   const resetMark = () => {
//     setMarkedForDelete(false)
//   }

//   if (props.openFolder !== context.openFolder) {
//     resetMark()
//   }

//   const type = 'ListHeader'
//   return (
//     <div className={`${type}__folder--delete`} onClick={toggleDelete}>
//       <MdDelete />
//       {markedForDelete ? 'Are you sure?' : null}
//     </div>
//   )
// }
