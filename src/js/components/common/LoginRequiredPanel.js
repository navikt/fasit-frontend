import React from "react"
import Alert from "react-bootstrap/Alert"

export default function LoginRequiredPanel(props) {
  return (
    <div style={{ paddingTop: "1rem" }} className="col-md-6">
      <Alert transition={false} variant="danger">
        Please login to use this page
      </Alert>
    </div>
  )
}
