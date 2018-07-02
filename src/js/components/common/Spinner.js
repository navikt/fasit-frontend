import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { styles } from "../../commonStyles/commonInlineStyles"

export default function Spinner() {
  return (
    <div style={styles.paddingTop5}>
      <FontAwesomeIcon icon="spinner" size="2x" pulse />
    </div>
  )
}
