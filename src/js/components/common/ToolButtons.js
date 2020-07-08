import React, { Component } from "react"
//import Button from "@material-ui/core/Button"
import Button from "react-bootstrap/Button"

export default class ToolButtons extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      disabled,
      //onEditClick,
      onDeleteClick,
      //onCopyClick,
      //hideCopyButton,
      //hideEditButton,
      hideDeleteButton,
    } = this.props
    return (
      <div
        /*className="buttonSpacing"*/ style={{
          paddingBottom: "1rem",
          //textAlign: "center"
        }}
      >
        {!hideDeleteButton && (
          <Button variant="danger" onClick={onDeleteClick} disabled={disabled}>
            Delete
          </Button>
        )}
      </div>
    )
  }
}
