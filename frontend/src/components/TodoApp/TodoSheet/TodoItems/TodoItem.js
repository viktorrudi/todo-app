/* eslint-disable react/prop-types */
import React, { useContext } from 'react'
import { TodoContext } from '../../TodoContext'
import PropTypes from 'prop-types'
import { propTypeForItems, propTypeForFolders } from '../../../../proptypes'
import './TodoItem.scss'

export default function TodoItem ({ item, findFolder }) {
  const { openFolder, toggleTodoComplete, setOpenItem } = useContext(
    TodoContext
  )

  const handleClick = (e, clickedItem) => {
    switch (e.target.tagName) {
      case 'SPAN':
        toggleTodoComplete(item._id)
        break
      case 'DIV':
        setOpenItem(clickedItem._id)
        break
      default:
        break
    }
  }

  let itemFolder
  itemFolder = findFolder(item.folder)

  const type = 'TodoItem'
  return (
    <div
      className={`${type} ${item.important ? 'important' : null}`}
      onClick={e => handleClick(e, item)}
    >
      {/* Custom checkbox */}
      <label>
        <input
          type="checkbox"
          className={`${type}__action--done`}
          onChange={handleClick}
          checked={item.completed}
          id={item._id}
        />
        <span className="check-toggle" onClick={handleClick} />
      </label>

      <div
        className={`${type}__item`}
        style={item.completed ? { color: '#aaa' } : { color: '#000' }}
      >
        {item.text}
        {openFolder ? null : (
          <aside className={`${type}__item--folder`}>
            {itemFolder ? itemFolder.name : null}
          </aside>
        )}
      </div>
    </div>
  )
}

TodoItem.propTypes = {
  toggleCompletedTodo: PropTypes.func,
  item: PropTypes.shape({ ...propTypeForItems }),
  openfolder: PropTypes.shape({ ...propTypeForFolders })
}

// class TodoItem extends Component {
//   static contextType = TodoContext

//   static propTypes = {
//     toggleCompletedTodo: PropTypes.func,
//     item: PropTypes.shape({ ...propTypeForItems }),
//     openfolder: PropTypes.shape({ ...propTypeForFolders })
//   }

//   handleClick = (e, clickedItem) => {
//     if (e.target.tagName === 'SPAN') {
//       this.context.toggleTodoComplete(this.props.item._id)
//     }
//     if (e.target.tagName === 'DIV') {
//       this.context.setOpenItem(clickedItem._id)
//     }
//   }

//   render () {
//     const { item, findFolder } = this.props
//     const completed = item.completed

//     let itemFolder
//     itemFolder = findFolder(item.folder)

//     const type = 'TodoItem'
//     return (
//       <div
//         className={`${type} ${item.important ? 'important' : null}`}
//         onClick={e => {
//           this.handleClick(e, item)
//         }}
//       >
//         {/* Custom checkbox */}
//         <label>
//           <input
//             type="checkbox"
//             className={`${type}__action--done`}
//             onChange={() => this.handleClick}
//             checked={item.completed}
//             id={item._id}
//           />
//           <span className="check-toggle" onClick={() => this.handleClick} />
//         </label>

//         <div
//           className={`${type}__item`}
//           style={completed ? { color: '#aaa' } : { color: '#000' }}
//         >
//           {item.text}
//           {this.context.openFolder ? null : (
//             <aside className={`${type}__item--folder`}>
//               {itemFolder ? itemFolder.name : null}
//             </aside>
//           )}
//         </div>
//       </div>
//     )
//   }
// }

// export default TodoItem
