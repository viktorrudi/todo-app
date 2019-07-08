import React, { useContext } from 'react'
import { AppContext } from '../../../AppContext'
import { MdExitToApp, MdSettings } from 'react-icons/md'

import './UserOptions.scss'

export default function UserFooter () {
  const context = useContext(AppContext)
  return (
    <footer className="UserOptions">
      <span
        className="UserOptions__option logout"
        onClick={() => context.logOut()}
      >
        <MdExitToApp /> Log out
      </span>
      <span
        className="UserOptions__option settings"
        // onClick={}
      >
        <MdSettings /> Settings
      </span>
    </footer>
  )
}
