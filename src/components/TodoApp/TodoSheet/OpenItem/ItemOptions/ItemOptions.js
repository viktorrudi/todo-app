import React, { Fragment } from 'react'
import ChangeFolder from './ChangeFolder'

export default function ItemOptions(props) {
  return (
    <Fragment>
      <ChangeFolder openitem={props.openItem} />
      <div openitem={props.openItem} className="small-btn btn-delete" onClick={props.delete}>
        Delete note
      </div>
    </Fragment>
  )
}
