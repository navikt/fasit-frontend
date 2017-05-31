import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardHeader, CardActions} from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import Restore from 'material-ui/svg-icons/action/restore'
import styles  from '../../commonStyles/commonInlineStyles'
import {red400, green400, orange300} from 'material-ui/styles/colors'

class Lifecycle extends Component {
    constructor(props) {
        super(props)
        this.state={visible:true}
    }

    rescueButton() {
        return (<FlatButton
                disableTouchRipple={true}
                label="Rescue"
                secondary="true"
                labelStyle={styles.bold}
                onTouchTap={this.props.rescueAction}
                disabled={!this.props.authorized}/>
        )
    }

    avatar() {
        return (
            <Avatar backgroundColor={red400} color={styles.colors.white}>
                <Restore/>
            </Avatar>
            )
    }

    cardBody() {
        const {lifecycle} = this.props
        if(lifecycle.issue) {
            return (
                <CardText>
                    See jira issue {}
                </CardText>
            )
        }
}

    render() {
        const {lifecycle, jira} = this.props

        if (lifecycle === undefined) return null

        if (!this.state.visible) return null
         switch (lifecycle.status) {
            case "stopped":
                 return (
                     <Card>
                         <CardHeader
                             title="Element stopped"
                             subtitle={`Scheduelded for deletion on ${moment(lifecycle.nextactiondate).format('ll, HH:mm')}`}
                             actAsExpander={true}
                             showExpandableButton={lifecycle.issue}
                             avatar={this.avatar()} />

                         <CardActions>
                             {this.rescueButton()}
                         </CardActions>
                     </Card>
                )
            case "alerted":
                return (
                    <div className="alert alert-dismissible alert-info col-md-8">
                        <button type="button" className="close" onClick={() => this.setState({visible:false})}>&times;</button>
                         This element is a candidate for deletion and will be <b>stopped</b><br />
                        {moment(lifecycle.nextactiondate).format('ll, HH:mm')}
                        <br />See <a href={`${jira}/browse/${lifecycle.issue}`}
                                     target="jira">Jira-issue</a> for more details<br />

                    </div>
                )
            case "rescued":
                 return (
                     <div className="alert alert-dismissible alert-info col-md-8">
                         <button type="button" className="close" onClick={() => this.setState({visible:false})}>&times;</button>
                            This element has been <b>rescued</b> from deletion until&nbsp;
                            <strong>{moment(lifecycle.nextactiondate).format('ll, HH:mm')}</strong><br />
                            See <a href={`${jira}/browse/${lifecycle.issue}`} target="jira"><b>Jira-issue</b></a> for
                            more details<br />
                        </div>
                )
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
