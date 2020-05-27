import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import EditIcon from "@material-ui/icons/Edit";

export default class ToolButtons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      disabled,
      onEditClick,
      onDeleteClick,
      onCopyClick,
      hideCopyButton,
      hideEditButton,
      hideDeleteButton,
    } = this.props;
    return (
      <div className="buttonSpacing">
        {!hideCopyButton && (
          <Button
            disabled={disabled}
            size="small"
            variant="outlined"
            onClick={onCopyClick}
            startIcon={<FileCopyIcon />}
          >
            Copy
          </Button>
        )}
        {!hideEditButton && (
          <Button
            variant="outlined"
            size="small"
            disabled={disabled}
            onClick={onEditClick}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        )}
        {!hideDeleteButton && (
          <Button
            variant="outlined"
            size="small"
            disabled={disabled}
            onClick={onDeleteClick}
            startIcon={<DeleteIcon />}
          >
            Delete
          </Button>
        )}
      </div>
    );
  }
}
