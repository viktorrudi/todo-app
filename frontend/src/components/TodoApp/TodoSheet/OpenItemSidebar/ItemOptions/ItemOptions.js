import React from 'react'
import PropTypes from 'prop-types'
import ChangeFolder from './Options/ChangeFolder'
import DeleteItem from './Options/DeleteItem'
import SetImportant from './Options/SetImportant'

export default function ItemOptions () {
  return (
    <>
      <SetImportant />
      <ChangeFolder />
      <DeleteItem />
    </>
  )
}

ItemOptions.propTypes = {
  openItem: PropTypes.string
}
