import React, { Component } from 'react'
import './OpenItem.scss'
import PropTypes from 'prop-types'
import ItemOptions from './ItemOptions/ItemOptions'
import { TodoContext } from '../../../../TodoContext'
import { MdClose } from 'react-icons/md'

class OpenItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itemID: null,
      itemText: ''
    }
  }

  static propTypes = {
    items: PropTypes.array,
    openItem: PropTypes.number
  }

  static contextType = TodoContext

  handleChange = e => {
    this.setState({
      itemText: e.target.value
    })
  }

  handleSubmit = e => {
    this.context.updateItem(
      'UPDATE_ITEM_TEXT',
      this.state.itemID,
      this.state.itemText
    )
    e.preventDefault()
  }

  findOpenItem = openItemID => {
    const found = this.props.items.filter(folder => {
      return openItemID === folder._id
    })
    // Returns name of item
    return found[0]
  }

  componentDidUpdate = (prevProps, prevState) => {
    // Updates state to contain currently selected item (from props)
    if (prevProps.openItem !== this.props.openItem) {
      this.setState({
        itemID: this.props.openItem,
        itemText: this.findOpenItem(this.props.openItem).text
      })
    }
  }

  componentDidMount = () => {
    this.setState({
      itemID: this.props.openItem,
      itemText: this.findOpenItem(this.props.openItem).text
    })
  }

  handleDelete = () => {
    return this.context.removeTodoItem(this.state.itemID)
  }

  render () {
    const openItem = this.context.items.filter(
      item => this.context.openItem === item._id
    )
    const [folderForOpenItem] = this.context.folders.filter(
      folder => openItem[0].folder === folder._id
    )

    const type = 'OpenItem'
    return (
      <div className={type}>
        <div
          className={`${type}__close`}
          onClick={() => this.context.setOpenItem(null)}
        >
          <MdClose />
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
        <div className={`${type}__info`}>
          <div className={`${type}__info--time`}>
            Created {this.findOpenItem(this.props.openItem).creationStamp}
          </div>
          <div className={`${type}__info--folder`}>
            {folderForOpenItem ? folderForOpenItem.name : null}
          </div>
        </div>

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
