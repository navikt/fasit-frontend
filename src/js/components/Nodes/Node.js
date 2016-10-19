import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchFasitData} from '../../actionCreators/node_fasit'
import NodeSeraView from './NodeSeraView'
import NodeEventsView from './NodeEventsView'
import NodeSecurityView from './NodeSecurityView'
import NodeRevisionsView from './NodeRevisionsView'
import NodeFasitViewPreviewMode from './NodeFasitViewPreviewMode'
import NodeFasitViewEditMode from './NodeFasitViewEditMode'
import NodeFasitViewNewNodeForm from './NodeFasitViewNewNodeForm'
import NodeFasitViewDeleteNodeForm from './NodeFasitViewDeleteNodeForm'
import NodeFasitViewSubmitDeleteStatus from './NodeFasitViewSubmitDeleteStatus'
import NodeFasitViewSubmitNewNodeStatus from './NodeFasitViewSubmitNewNodeStatus'

class Node extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, hostname} = this.props
        dispatch(fetchFasitData(hostname))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, hostname} = this.props
        if (hostname != nextProps.hostname) {
            dispatch(fetchFasitData(nextProps.hostname))
        }
    }

    showFasitData() {
        const {fasit, editMode}= this.props
        if (fasit.isFetching || !fasit.data)
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>

        else if (fasit.requestFailed)
            return (
                <div>Retrieving Fasit-data failed:
                    <br />
                    <br />
                    <pre><i>{fasit.requestFailed}</i></pre>
                </div>
            )

        else if (editMode) {
            return <NodeFasitViewEditMode />
        } else {
            return <NodeFasitViewPreviewMode />
        }
    }

    render() {
        const {hostname} = this.props
        const grafanaSrc = "http://grafana.adeo.no/dashboard-solo/db/fasit-data-template?var-hostname=" + hostname + "&panelId=1&from=1471918908430&to=1471940508430&theme=light"
        return (
            <div>
                <div className="col-md-12">
                    <NodeSeraView hostname={hostname}/>
                </div>
                <div>
                    <div className="col-md-6">
                        {this.showFasitData()}

                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <NodeRevisionsView hostname={hostname}/>
                        </div>
                        <div className="row">
                            <NodeSecurityView />
                            <NodeEventsView />
                        </div>
                        <div className="row">
                            <iframe src={grafanaSrc}
                                    width="100%"
                                    height="200"
                                    frameBorder="1">
                            </iframe>
                        </div>
                        <NodeFasitViewNewNodeForm />
                        <NodeFasitViewDeleteNodeForm hostname={hostname} />
                        <NodeFasitViewSubmitNewNodeStatus />
                        <NodeFasitViewSubmitDeleteStatus />
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        fasit: state.node_fasit,
        user: state.user,
        editMode: state.nodes.showEditNodeForm,
        hostname: ownProps.hostname,
    }
}

export default connect(mapStateToProps)(Node)
