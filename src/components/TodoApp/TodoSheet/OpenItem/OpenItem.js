import React, { Component } from "react";
import "./OpenItem.scss";

class OpenItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.openItem
    };
  }

  handleChange = e => {
    this.setState({
      item: {
        ...this.state.item,
        text: e.target.value
      }
    });
    this.props.handleChangeOpenItem("change_text", e.target.value);
  };

  handleDelete = () => {
    this.props.handleChangeOpenItem("delete_item", this.state.item);
  };

  componentWillReceiveProps(parentProps) {
    // Updates state to match props sent from TodoSheet
    if (parentProps.openItem !== this.state.item) {
      this.setState({ item: parentProps.openItem });
    }
  }

  render() {
    const type = "OpenItem";
    return (
      <div className={type}>
        <ul className={`${type}__actions`}>
          <li
            className={`${type}__actions--close small-btn`}
            onClick={this.props.closeOpenedItem}
          >
            X
          </li>
          <li className="small-btn" onClick={this.handleDelete}>
            D
          </li>
          <li className="small-btn">I</li>
          <li className="small-btn">F</li>
        </ul>
        <input
          className={`${type}__note-input`}
          type="text"
          value={this.state.item.text}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default OpenItem;
