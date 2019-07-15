import React, { useContext } from 'react'
import { TodoContext } from '../TodoContext'
import AddTodo from './AddTodo/AddTodo'
import TodoItems from './TodoItems/TodoItems'
import ListHeader from './ListHeader/ListHeader'
import OpenItemSidebar from './OpenItemSidebar/OpenItemSidebar'
import SortingOptions from './SortingOptions/SortingOptions'
import './TodoSheet.scss'

export default function TodoSheet () {
  const { items, folders, openFolder, openItem } = useContext(TodoContext)
  const type = 'TodoSheet'

  return (
    <>
      <div className={`${type}`}>
        <div className={`${type}__items`}>
          <SortingOptions />
          <AddTodo items={items} openFolder={openFolder} />
          {openFolder && (
            <ListHeader folders={folders} openFolder={openFolder} />
          )}
          <TodoItems />
        </div>
      </div>
      {openItem && <OpenItemSidebar />}
    </>
  )
}
