import React, { Component } from "react"
import Button from "react-bootstrap/Button"

export default class ToolButtons extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { disabled, onEditClick, onDeleteClick, showEditButton } = this.props
    return (
      <div
        style={{
          paddingBottom: "1rem",
        }}
      >
        {showEditButton ? (
          <React.Fragment>
            <Button
              variant="primary"
              onClick={onEditClick}
              disabled={disabled}
              style={{ paddingRight: "1rem" }}
            >
              Edit
            </Button>{" "}
          </React.Fragment>
        ) : null}
        <Button variant="danger" onClick={onDeleteClick} disabled={disabled}>
          Delete
        </Button>
      </div>
    )
  }
}
