import React, { useContext } from 'react'
import { TodoContext } from '../../TodoContext'
import { MdStar, MdInbox } from 'react-icons/md'

export default function ChangeView () {
  const { setItemView, setOpenFolder } = useContext(TodoContext)

  return (
    <>
      <div
        className="AllItems option"
        onClick={() => {
          setItemView('all')
          setOpenFolder(null)
        }}
      >
        <MdInbox /> All items
      </div>

      <div
        className="Important option"
        onClick={() => setItemView('important')}
      >
        <MdStar /> Important items
      </div>
    </>
  )
}
