import React, { useContext, useState, useEffect } from 'react'
import { TodoContext } from '../TodoContext'
import Folders from './Folders/Folders'
import CreateFolder from './CreateFolder/CreateFolder'
import UserOptions from '../UserOptions/UserOptions'
import { MdFolder, MdMenu } from 'react-icons/md'
import './Sidebar.scss'

export default function Sidebar () {
  const { items, folders, setOpenFolder } = useContext(TodoContext)
  const [isOpen, setOpen] = useState(true)

  useEffect(() => {
    if (window.innerWidth <= 800) {
      setOpen(false)
    }
  }, [])

  const type = 'Sidebar'

  return (
    <aside className={`${type} ${isOpen ? 'open' : 'closed'}`}>
      <div className="MenuIcon" onClick={() => setOpen(!isOpen)}>
        <MdMenu />
      </div>
      <UserOptions />
      <h2>
        <span role="img" aria-label="Todo">
          👌
        </span>
        <small>v.1.0.0</small>
      </h2>

      <div className={`${type}__wrapper`}>
        <div
          className={`${type}--seeAllFolders`}
          onClick={() => setOpenFolder(null)}
        >
          See All <strong>{items.length}</strong> items
        </div>

        <h3>
          <MdFolder /> Folders
        </h3>
        <Folders folders={folders} items={items} />
        <CreateFolder folders={folders} />
      </div>
    </aside>
  )
}

// class TodoFolders extends Component {
//   static contextType = TodoContext
//   static propTypes = {
//     getSelectedFolder: PropTypes.func
//   }

//   render () {
//     const type = 'TodoFolders'
//     const { items, folders } = this.context
//     return (
//       <aside className={type}>
//         <UserOptions />
//         <h2>
//           ToD
//           <span role="img" aria-label="Todo">
//             👌
//           </span>
//           <small>v.1.0.0</small>
//         </h2>

//         <div
//           className={`${type}--seeAllFolders`}
//           onClick={() => this.context.setOpenFolder(null)}
//         >
//           See All <strong>{items.length}</strong> items
//         </div>

//         <h3>
//           <MdFolder /> Folders
//         </h3>
//         <Folders folders={folders} items={items} />
//         <CreateFolder folders={folders} />
//       </aside>
//     )
//   }
// }

// export default TodoFolders
