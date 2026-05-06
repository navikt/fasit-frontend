import React, { Component } from "react"
import { connect } from "react-redux"
import { Card, CardHeader } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Restore from "@mui/icons-material/Restore"
import { colors, styles } from "../../commonStyles/commonInlineStyles"

class Lifecycle extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: true }
  }

  avatar(iconColor) {
    return (
      <Avatar style={{backgroundColor: iconColor}}>
        <Restore style={styles.white} />
      </Avatar>
    )
  }

  card(title, iconColor) {
    return (
      <Card style={styles.cardPadding}>
        <CardHeader
          title={title}
          titleTypographyProps={{style: styles.bold}}
          avatar={this.avatar(iconColor)}
        />
      </Card>
    )
  }

  render() {
    const { lifecycle } = this.props

    if (lifecycle === undefined) return null

    if (!this.state.visible) return null

    switch (lifecycle.status) {
      case "stopped":
        return this.card("Element stopped", colors.red)
      case "alerted":
        return this.card("This is a candidate for deletion", colors.orange)
      default:
        return <div />
    }
  }
}

const mapStateToProps = state => {
  return {}
}

export default connect(mapStateToProps)(Lifecycle)
