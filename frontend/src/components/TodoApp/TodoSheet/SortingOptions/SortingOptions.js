import React, { useContext } from 'react'
import { TodoContext } from '../../TodoContext'
import './SortingOptions.scss'

export default function SortingOptions () {
  const { showCompleted, setShowCompleted, showOptions } = useContext(
    TodoContext
  )

  const handleChange = () => {
    showCompleted ? setShowCompleted(false) : setShowCompleted(true)
  }

  const type = 'SortingOptions'
  return (
    <div className={`${type} ${showOptions ? 'visible' : 'hidden'}`}>
      <div className={`${type}__hide-completed`}>
        <label>
          <input
            type="checkbox"
            className="TodoItem__action--done"
            onChange={handleChange}
            checked={!showCompleted}
          />
          <span className="check-toggle" />
          <p>Hide completed items</p>
        </label>
      </div>
    </div>
  )
}
