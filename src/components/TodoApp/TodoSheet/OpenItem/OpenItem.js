import React, { Component } from 'react'
import './OpenItem.scss'

class OpenItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      item: this.props.openItem,
    }
  }

  handleChange = e => {
    this.setState({
      item: {
        ...this.state.item,
        text: e.target.value,
      },
    })
  }

  handleSubmit = e => {
    this.props.handleChangeOpenItem('change_text', this.state.item)
    e.preventDefault()
  }

  handleDelete = () => {
    this.props.handleChangeOpenItem('delete_item', this.state.item)
  }

  componentWillReceiveProps(parentProps) {
    // Updates state to match props sent from TodoSheet
    if (parentProps.openItem !== this.state.item) {
      this.setState({ item: parentProps.openItem })
    }
  }

  render() {
    const type = 'OpenItem'
    return (
      <div className={type}>
        <div className={`${type}__close`} onClick={this.props.closeOpenedItem}>
          Close
        </div>
        <form onSubmit={this.handleSubmit}>
          <input
            className={`${type}__note-input`}
            type="text"
            value={this.state.item.text}
            onChange={this.handleChange}
          />
        </form>
        <ul className={`${type}__actions`}>
          <li className="small-btn btn-update">Change folder</li>
          <li className="small-btn btn-delete" onClick={this.handleDelete}>
            Delete note
          </li>
        </ul>
      </div>
    )
  }
}

export default OpenItem
