import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {fetchRevisions, fetchRevision, setActiveRevision} from '../../actionCreators/common'
import {Popover, OverlayTrigger} from 'react-bootstrap'

class RevisionsView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayAllRevisions: false
        }
    }

    componentDidMount() {
        const {dispatch, hostname} = this.props
        dispatch(fetchRevisions(hostname))
    }

    componentWillReceiveProps(next) {
        const {dispatch, hostname} = this.props
        if (hostname != next.hostname && next.hostname)
            dispatch(fetchRevisions(next.hostname))
    }

    handleFetchRevision(type, key, revision) {
        const {dispatch} = this.props
        dispatch(fetchRevision(type, key, revision))
    }


    createPopover(author, type) {
        const {revisions} = this.props
        if (revisions.activeRevisionIsFetching || !revisions.activeRevisionData)
            return <Popover id="Revision" className="popover-size"><i
                className="fa fa-spinner fa-pulse fa-2x"></i></Popover>
        else if (revisions.activeRevisionRequestFailed) {
            return (
                <Popover id="Revision" className="popover-size" title="Something went wrong...">
                    <div>Retrieving revision failed with the following message:
                        <br />
                        <pre><i>{revisions.activeRevisionRequestFailed}</i></pre>
                    </div>
                </Popover>
            )
        }
        else {
            const revision = revisions.activeRevisionData
            switch (type) {
                case "node":
                    return (
                        <Popover
                            className="popover-size"
                            id="Revision"
                            title={"Revision #" + revision.revision + " by " + author}
                        >
                            <b>hostname:</b> <span className="text-right">{revision.hostname + '\n'}</span><br />
                            <b>env. class:</b> <span
                            className="text-right">{revision.environmentclass + '\n'}</span><br />
                            <b>environment:</b> <span className="text-right">{revision.environment + '\n'}</span><br />
                            <b>type:</b> <span className="text-right">{revision.type + '\n'}</span><br />
                            <b>username:</b> <span className="text-right">{revision.username + '\n'}</span><br />
                            <b>cluster:</b> <span className="text-right">{revision.cluster.name + '\n'}</span><br />
                            <b>applications:</b> <span className="text-right">{revision.applications + '\n'}</span><br />
                        </Popover>
                    )
            }

        }
    }

    showRevisionsContent() {
        const {revisions, dispatch, type, hostname} = this.props
        let key = ""
        switch (type) {
            case "node":
                key = hostname
        }
        if (revisions.isFetching)
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>

        else if (revisions.requestFailed)
            return <div>Retrieving revisions failed with the following message:
                <br />
                <pre><i>{revisions.requestFailed}</i></pre>
            </div>

        let displayRevisions = revisions.data
        if (!this.state.displayAllRevisions)
            displayRevisions = revisions.data.slice(0, 5)

        return (
            <table className="table table-hover">
                <tbody>
                {displayRevisions.map(rev => {
                    return <tr
                        key={rev.revision}
                        onClick={() => dispatch(setActiveRevision(rev.revision))}
                        className={(rev.revision === revisions.activeRevision) ? "cursor-pointer info" : "cursor-pointer"}
                    >
                        <OverlayTrigger
                            trigger={["hover", "focus"]}
                            rootClose={true}
                            placement="left"
                            onEnter={() => this.handleFetchRevision(type, key, rev.revision)}
                            overlay={this.createPopover(rev.author, type)}
                        >
                            <td className="cursor-pointer"><i
                                className="fa fa-search"/></td>
                        </OverlayTrigger>
                        <td>{rev.revisiontype === "mod"? "Modified" : "Created"} by {rev.author}</td>
                        <td>{moment(rev.timestamp).fromNow()}</td>
                        {rev.message?<td><i className="fa fa-comment" /></td>:null}


                    </tr>
                })}
                </tbody>
            </table>
        )
    }

    showRevisionsFooter() {
        const {revisions} = this.props
        if (revisions.data.length > 5 && !this.state.displayAllRevisions) {
            return (
                <div className="information-box-footer">
                    Showing 5 of {revisions.data.length} revisions.
                    <a className="text-right arrow cursor-pointer"
                       onClick={() => this.setState({displayAllRevisions: true})}>Show All <i
                        className="fa fa-angle-double-down"/></a>
                </div>
            )
        }
        if (revisions.data.length > 5 && this.state.displayAllRevisions) {
            return (
                <div className="information-box-footer">
                    Showing all revisions.
                    <a className="text-right arrow cursor-pointer"
                       onClick={() => this.setState({displayAllRevisions: false})}>Hide <i
                        className="fa fa-angle-double-up"/></a>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <div className="node-information-box">
                    {this.showRevisionsContent()}
                </div>
                {this.showRevisionsFooter()}

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    hostname: ownProps.hostname,
    revisions: state.revisions,
    type: ownProps.type
})

export default connect(mapStateToProps)(RevisionsView)
