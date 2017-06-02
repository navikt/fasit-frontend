import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Restore from 'material-ui/svg-icons/action/restore'
import {styles, colors}  from '../../commonStyles/commonInlineStyles'

class Lifecycle extends Component {
    constructor(props) {
        super(props)
        this.state = {visible: true}
    }

    avatar(iconColor) {
        return (
            <Avatar backgroundColor={iconColor}>
                <Restore style={styles.white}/>
            </Avatar>
        )
    }

    cardBody() {
        const {lifecycle, jira} = this.props
        if (lifecycle.issue) {
            return (
                <CardText expandable={true}>
                    See jira issue <a href={`${jira}/browse/${lifecycle.issue}`}
                                      target="jira"> {lifecycle.issue}</a> for details
                </CardText>
            )
        }
    }

    card(title, subtitle, iconColor, displayRescueButton = true) {
        const {lifecycle} = this.props
        return (<Card expandable={lifecycle.issue !== undefined} initiallyExpanded={false}
                      style={styles.marginTop5}>
            <CardHeader
                title={title}
                titleStyle={styles.bold}
                subtitle={subtitle}
                actAsExpander={true}
                avatar={this.avatar(iconColor)}
                showExpandableButton={lifecycle.issue !== undefined}/>
            {this.cardBody()}
            <CardActions expandable={true}>
                {displayRescueButton && <FlatButton
                    disableTouchRipple={true}
                    label="Rescue"
                    secondary={true}
                    labelStyle={styles.bold}
                    onTouchTap={this.props.rescueAction}
                    disabled={!this.props.authorized}/>}
            </CardActions>
        </Card>)
    }

    render() {
        const {lifecycle} = this.props

        if (lifecycle === undefined) return null

        if (!this.state.visible) return null
            let subtitle

        switch (lifecycle.status) {
            case "stopped":
                subtitle = `Scheduelded for deletion on ${moment(lifecycle.nextactiondate).format('ll, HH:mm')}`
                return this.card("Element stopped", subtitle, colors.red)
            case "alerted":
                subtitle = `This is a candidate for deletion and will be stopped on ${moment(lifecycle.nextactiondate).format('ll, HH:mm')}`
                return this.card("Element alerted", subtitle, colors.orange)
            case "rescued":
                subtitle = `This element has been rescued from deletion until ${moment(lifecycle.nextactiondate).format('ll, HH:mm')}`
                return this.card("Element rescued", subtitle, colors.green, false)
            default :
                return <div />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        jira: state.configuration.jira,
    }
}

export default connect(mapStateToProps)(Lifecycle)
