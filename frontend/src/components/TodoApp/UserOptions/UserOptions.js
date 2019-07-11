import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext'
import { MdExitToApp } from 'react-icons/md'

import './UserOptions.scss'

export default function UserFooter () {
  const { logOut } = useContext(AppContext)
  return (
    <footer className="UserOptions">
      <span className="UserOptions__option logout" onClick={() => logOut()}>
        <MdExitToApp /> Log out
      </span>
    </footer>
  )
}
