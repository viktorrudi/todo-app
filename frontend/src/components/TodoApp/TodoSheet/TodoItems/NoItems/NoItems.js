import React, { useContext } from 'react'
import { TodoContext } from '../../../TodoContext'
import './NoItems.scss'

export default function NoItems () {
  const { viewItems } = useContext(TodoContext)

  return (
    <div className="NoItems">
      <span role="img" aria-label="No items">
        {viewItems === 'important' ? '😔' : '🥺'}
      </span>
      <br />
      {viewItems === 'important'
        ? 'You dont have any important items'
        : 'There are no items here. Add one, please!'}
    </div>
  )
}
