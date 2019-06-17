import React from 'react'
import { TodoContext } from '../../../../TodoContext'

function Folder (props) {
  // TODO: Add method to update clicked on folder to set as selected folder to context
  const type = 'Folder'
  const color = props.folder.color
  const { handleHover, handleClick, folder, itemCount } = props

  return (
    <div
      className={type}
      onMouseOver={handleHover}
      onMouseLeave={handleHover}
      onClick={handleClick}
      id={folder.id}
    >
      <span className={`${type}--icon`} style={{ backgroundColor: color }} />
      <p className={`${type}--name`}>{folder.name}</p>
      <span className={`${type}--badge`}>{itemCount}</span>
      <span className={`${type}--delete`}>x</span>
    </div>
  )
}
// class Folder extends Component {
//   static contextType = TodoContext
//   handleClick = e => {
//     this.props.getSelectedFolder(parseInt(e.target.id))
//   }
//   render () {
//     const type = 'Folder'
//     const color = this.props.folder.color

//     return (
//       <div
//         className={type}
//         onMouseOver={this.handleHover}
//         onMouseLeave={this.handleHover}
//         onClick={this.handleClick}
//         id={this.props.folder.id}
//       >
//         <span className={`${type}--icon`} style={{ backgroundColor: color }} />
//         <p className={`${type}--name`}>{this.props.folder.name}</p>
//         <span className={`${type}--badge`}>{this.props.itemCount}</span>
//         <span className={`${type}--delete`}>x</span>
//       </div>
//     )
//   }
// }

export default Folder
