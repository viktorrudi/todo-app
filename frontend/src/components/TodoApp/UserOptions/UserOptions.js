import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext'
import { TodoContext } from '../TodoContext'
import { MdExitToApp, MdSettings } from 'react-icons/md'
import './UserOptions.scss'

export default function UserFooter () {
  const { logOut } = useContext(AppContext)
  const { setShowOptions, showOptions } = useContext(TodoContext)
  return (
    <footer className="UserOptions">
      <span className="UserOptions__option logout" onClick={() => logOut()}>
        <MdExitToApp /> Log out
      </span>
      <span
        className="UserOptions__option settings"
        onClick={() => setShowOptions(!showOptions)}
      >
        <MdSettings /> {showOptions ? 'Hide options' : 'Options'}
      </span>
    </footer>
  )
}
