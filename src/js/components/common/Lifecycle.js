import React, { Component } from "react"
import { connect } from "react-redux"
import { Card, CardHeader } from "material-ui/Card"
import Avatar from "material-ui/Avatar"
import Restore from "material-ui/svg-icons/action/restore"
import { colors, styles } from "../../commonStyles/commonInlineStyles"

class Lifecycle extends Component {
  constructor(props) {
    super(props)
    this.state = { visible: true }
  }

  avatar(iconColor) {
    return (
      <Avatar backgroundColor={iconColor}>
        <Restore style={styles.white} />
      </Avatar>
    )
  }

  card(title, iconColor) {
    return (
      <Card expandable={false} initiallyExpanded={false} style={styles.cardPadding}>
        <CardHeader
          title={title}
          titleStyle={styles.bold}
          actAsExpander={true}
          avatar={this.avatar(iconColor)}
          showExpandableButton={false}
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
