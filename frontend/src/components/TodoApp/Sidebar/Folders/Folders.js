import React, { useContext } from 'react'
import { TodoContext } from '../../TodoContext'
import { findItemCount } from '../../../../utilities/utilities'
import Folder from './Folder'
import './Folders.scss'

export default function Folders () {
  const { items, folders, openFolder } = useContext(TodoContext)

  return (
    <div className="Folders">
      {folders.map(folder => (
        <Folder
          key={folder._id}
          folder={folder}
          open={folder._id === openFolder}
          itemCount={findItemCount(items, folder)}
        />
      ))}
    </div>
  )
}
