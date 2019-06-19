import React, { Component } from 'react'
import './OpenItem.scss'
import ItemOptions from './ItemOptions/ItemOptions'
import { TodoContext } from '../../../../TodoContext'

class OpenItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itemText: null
    }
  }
  static contextType = TodoContext

  handleChange = e => {
    this.setState({
      itemText: e.target.value
    })
  }

  handleSubmit = e => {
    // this.props.handleChangeOpenItem('change_text', this.state.item)
    // e.preventDefault()
  }

  handleDelete = () => {
    // this.props.handleChangeOpenItem('delete_item', this.state.item)
    this.context.removeTodoItem(this.state.item.id)
  }

  // componentWillReceiveProps (parentProps) {
  //   // Updates state to match props sent from TodoSheet
  //   if (parentProps.openItem !== this.state.item) {
  //     this.setState({ item: parentProps.openItem })
  //   }
  // }

  // findOpenedItemDetails = () => {
  //   const allItems = this.context.items
  // }

  render () {
    const type = 'OpenItem'
    return (
      <div className={type}>
        <div
          className={`${type}__close`}
          onClick={this.context.setOpenItem(null)}
        >
          Close
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            className={`${type}__note-input`}
            type="text"
            value={this.context.openItem.text}
            onChange={this.handleChange}
          />
        </form>
        <div className={`${type}__actions`}>
          <ItemOptions
            openItem={this.context.openItem}
            delete={this.handleDelete}
          />
        </div>
      </div>
    )
  }
}

export default OpenItem
