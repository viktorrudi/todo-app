import React, { useContext, useState, useEffect } from 'react'
import { TodoContext } from '../TodoContext'
import Folders from './Folders/Folders'
import ChangeView from './ChangeView/ChangeView'
import CreateFolder from './CreateFolder/CreateFolder'
import UserOptions from '../UserOptions/UserOptions'
import { MdMenu } from 'react-icons/md'
import './Sidebar.scss'

export default function Sidebar () {
  const { items, folders } = useContext(TodoContext)
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
        ToD
        <span role="img" aria-label="Todo">
          👌
        </span>
        <small>v.1.0.0</small>
      </h2>

      <div className={`${type}__wrapper`}>
        <ChangeView />
        <hr />
        <Folders folders={folders} items={items} />
        <CreateFolder folders={folders} />
      </div>
    </aside>
  )
}
