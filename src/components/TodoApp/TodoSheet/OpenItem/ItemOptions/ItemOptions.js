import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { propTypeForItems } from '../../../../../proptypes'
import ChangeFolder from './ChangeFolder'

export default function ItemOptions (props) {
  return (
    <Fragment>
      <ChangeFolder openitem={props.openItem} />
      <div
        openitem={props.openItem}
        className="small-btn btn-delete"
        onClick={props.delete}
      >
        Delete note
      </div>
    </Fragment>
  )
}

ItemOptions.propTypes = {
  openItem: propTypeForItems,
  delete: PropTypes.func
}
