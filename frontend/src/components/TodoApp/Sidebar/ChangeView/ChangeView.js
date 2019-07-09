import React, { useContext } from 'react'
import { TodoContext } from '../../TodoContext'
import { MdStar, MdList } from 'react-icons/md'

export default function ChangeView () {
  const { setItemView, setOpenFolder } = useContext(TodoContext)

  return (
    <>
      <div
        className="option"
        onClick={() => {
          setItemView('all')
          setOpenFolder(null)
        }}
      >
        <MdList /> All items
      </div>

      <div className="option" onClick={() => setItemView('important')}>
        <MdStar /> Important items
      </div>
    </>
  )
}
