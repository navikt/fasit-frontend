import React from "react"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogActions from "@mui/material/DialogActions"

// Drop-in replacement for react-bootstrap Modal using MUI Dialog
function Modal({ show, onHide, children, bsSize, dialogClassName, autoFocus, enforceFocus, ...props }) {
  const maxWidth = bsSize === "small" ? "xs" : bsSize === "large" ? "lg" : "sm"
  return (
    <Dialog
      open={!!show}
      onClose={onHide}
      maxWidth={maxWidth}
      fullWidth
      className={dialogClassName}
      {...props}
    >
      {children}
    </Dialog>
  )
}

Modal.Header = function ModalHeader({ children }) {
  return <>{children}</>
}

Modal.Title = function ModalTitle({ children }) {
  return <DialogTitle>{children}</DialogTitle>
}

Modal.Body = function ModalBody({ children }) {
  return <DialogContent sx={{ overflow: 'visible' }}>{children}</DialogContent>
}

Modal.Footer = function ModalFooter({ children }) {
  return <DialogActions sx={{ display: 'block', padding: '8px 24px' }}>{children}</DialogActions>
}

export { Modal }
