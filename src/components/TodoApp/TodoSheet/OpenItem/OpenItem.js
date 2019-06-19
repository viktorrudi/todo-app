import React, { Component } from 'react'
import './OpenItem.scss'
import ItemOptions from './ItemOptions/ItemOptions'
import { TodoContext } from '../../../../TodoContext'

class OpenItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itemID: null,
      itemText: ''
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

  findOpenItemName = openItemID => {
    const found = this.props.items.filter(folder => {
      return openItemID === folder.id
    })
    // Returns name of item
    return found[0].text
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Updates state to contain currently selected item (from props)
    if (prevProps.openItem !== this.props.openItem) {
      this.setState({
        itemID: this.props.openItem.id,
        // Fetches name of item
        itemText: this.findOpenItemName(this.props.openItem)
      })
    }
  }

  componentDidMount = () => {
    this.setState({
      itemID: this.props.openItem,
      itemText: this.findOpenItemName(this.props.openItem)
    })
  }

  handleDelete = () => {
    this.context.removeTodoItem(this.state.itemID)
  }

  render () {
    const type = 'OpenItem'
    return (
      <div className={type}>
        <div
          className={`${type}__close`}
          onClick={() => this.context.setOpenItem(null)}
        >
          Close
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            className={`${type}__note-input`}
            type="text"
            value={this.state.itemText}
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
