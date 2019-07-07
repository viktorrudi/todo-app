import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import ChangeFolder from './ChangeFolder'
import { MdDelete } from 'react-icons/md'
import { TodoContext } from '../../../TodoContext'

export default function ItemOptions (props) {
  const context = useContext(TodoContext)

  return (
    <>
      Set as important
      <ChangeFolder />
      <div
        openitem={props.openItem}
        className="small-btn btn-delete"
        onClick={() => context.removeTodoItem(context.openItem)}
      >
        <MdDelete />
        Delete note
      </div>
    </>
  )
}

ItemOptions.propTypes = {
  openItem: PropTypes.string,
  delete: PropTypes.func
}
