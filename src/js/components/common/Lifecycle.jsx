import React, { useState } from "react"
import { connect } from "react-redux"
import { Card, CardHeader } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Restore from "@mui/icons-material/Restore"
import { colors, styles } from "../../commonStyles/commonInlineStyles"

function Lifecycle({ lifecycle }) {
  const [visible] = useState(true)

  const avatar = (iconColor) => (
    <Avatar style={{backgroundColor: iconColor}}>
      <Restore style={styles.white} />
    </Avatar>
  )

  const card = (title, iconColor) => (
    <Card style={styles.cardPadding}>
      <CardHeader
        title={title}
        slotProps={{title: {style: styles.bold}}}
        avatar={avatar(iconColor)}
      />
    </Card>
  )

  if (lifecycle === undefined) return null

  if (!visible) return null

  switch (lifecycle.status) {
    case "stopped":
      return card("Element stopped", colors.red)
    case "alerted":
      return card("This is a candidate for deletion", colors.orange)
    default:
      return <div />
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(Lifecycle)
