import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import moment from 'moment'
import {connect} from 'react-redux'
import {fetchRevisions} from '../../actionCreators/common'
import {OverlayTrigger, Tooltip} from 'react-bootstrap'

class RevisionsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayAllRevisions: false
        }
    }

    componentDidMount() {
        const {dispatch, id, component} = this.props
        dispatch(fetchRevisions(component, id))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, id, component} = nextProps

        if (this.props.id !== nextProps.id) {
            dispatch(fetchRevisions(component, id))
        }
    }


    tooltip(message) {
        return (
            <Tooltip id="tooltip">{message}</Tooltip>
        )
    }

    showRevisionsFooter() {
        const {revisions} = this.props
        if (revisions.data.length > 5 && !this.state.displayAllRevisions) {
            return (
                <div className="information-box-footer">
                    <a className="text-right arrow cursor-pointer"
                       onClick={() => this.setState({displayAllRevisions: true})}>Show all ({revisions.data.length}) <i
                        className="fa fa-angle-double-down"/></a>
                </div>
            )
        }
        if (revisions.data.length > 5 && this.state.displayAllRevisions) {
            return (
                <div className="information-box-footer">
                    <a className="text-right arrow cursor-pointer"
                       onClick={() => this.setState({displayAllRevisions: false})}>Show less <i
                        className="fa fa-angle-double-up"/></a>
                </div>
            )
        }
    }

    render() {
            moment.locale("en")
            const {revisions, routing, currentRevision} = this.props

            if (revisions.isFetching) {
                return (
                  <div>
                        <i className="fa fa-spinner fa-pulse fa-2x"></i>
                    </div>
                )
            }

            else if (revisions.requestFailed)
                return  <div key="1">Unable to fetch revisions</div>

            let displayRevisions = revisions.data
           
            if (!this.state.displayAllRevisions)
                displayRevisions = revisions.data.slice(0, 5)
            return (
                <ul className="revisionList">
                    {displayRevisions.map(rev => {
                        const className = rev.revision == currentRevision ? "revisionListItem currentRevision " : "revisionListItem"
                        return (
                            <OverlayTrigger
                                placement="left"
                                key={rev.revision}
                                overlay={this.tooltip(rev.revisiontype === 'add' ? "Created" : rev.message || 'Changes made without a comment')}
                            >
                                <li id={rev.revision}>
                                    <Link
                                        onClick={() => browserHistory.push(routing.pathname + "?revision=" + rev.revision)}
                                        className={className}>
                                        {rev.revisiontype === 'add' ? 'Created' : 'Modified'} {moment(rev.timestamp).fromNow()}
                                        by {rev.author}</Link>
                                </li>
                            </OverlayTrigger>)
                    })}

                    {this.showRevisionsFooter()}
                </ul>
            )
        }
}

const mapStateToProps = (state) => ({
    //id: ownProps.id,
    revisions: state.revisions,
    //component: ownProps.component,
    routing: state.routing.locationBeforeTransitions
})

export default connect(mapStateToProps)(RevisionsView)