import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

class NodeHeading extends Component {
    constructor(props) {
        super(props)
    }

    showTypeImage() {
        const fasitData = this.props.fasit.fasitData
        const isFetching = this.props.fasit.isFetching
        if (!isFetching) {
            let img = ""
            switch (fasitData.type) {
                case 'jboss':
                    img = "jboss.png"
                    break;
                case 'was':
                case 'bpm':
                    img = "websphere.png"
                    break;
                case 'docker':
                    img = "security.png"
                    break;
                case 'datapower_physical':
                case 'datapower_virtual':
                    img = "oracle.png"
                    break;
                case 'openam_server':
                case 'openam_proxy':
                    img = "openam.png"
                    break;
                case 'windows':
                case 'windows_terminalserver':
                case 'windows_appserver':
                case 'windows_iisserver':
                case 'windows_rptserver':
                    img = "windows.png"
                    break;
                default:
                    img = "redhat.png"
            }
            const src = 'images/nodetypes/' + img
            return <img src={src} width='50px'/>
        }
    }

    render() {
        const {nodes, activeIndex} = this.props
        const hostname = this.props.params ? this.props.params.node : nodes[activeIndex].hostname

        return (
            <div>
                <h1>
                    <div className="node-type-image">
                        {this.showTypeImage()}
                    </div>
                    <Link
                        to={"/nodes/" + hostname}>{hostname}</Link>
                </h1>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        nodes: state.nodes.data,
        activeIndex: state.nodes.active,
        fasit: state.nodeData.fasit,

    }
}

export default connect(mapStateToProps)(NodeHeading)
