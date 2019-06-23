import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import ChangeFolder from './ChangeFolder'
import { MdDelete } from 'react-icons/md'

export default function ItemOptions (props) {
  return (
    <Fragment>
      <ChangeFolder />
      <div
        openitem={props.openItem}
        className="small-btn btn-delete"
        onClick={props.delete}
      >
        <MdDelete />
        Delete note
      </div>
    </Fragment>
  )
}

ItemOptions.propTypes = {
  openItem: PropTypes.number,
  delete: PropTypes.func
}
