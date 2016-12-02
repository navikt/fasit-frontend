import React, {Component, PropTypes} from 'react'

export default class NodeTypeImage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {type} = this.props
        switch (type) {
            case 'jboss':
                return <img className="node-type-image" src='/images/nodetypes/jboss.png'/>
            case 'was':
            case 'bpm':
                return <img className="node-type-image" src='/images/nodetypes/websphere.png'/>
            case 'docker':
                return <img className="node-type-image" src='/images/nodetypes/security.png'/>
            case 'datapower_physical':
            case 'datapower_virtual':
                return <img className="node-type-image" src='/images/nodetypes/oracle.png'/>
            case 'openam_server':
            case 'openam_proxy':
                return <img className="node-type-image" src='/images/nodetypes/openam.png'/>
            case 'windows':
            case 'windows_terminalserver':
            case 'windows_appserver':
            case 'windows_iisserver':
            case 'windows_rptserver':
                return <img className="node-type-image" src='/images/nodetypes/windows.png'/>
            case 'rhel':
                return <img className="node-type-image" src='/images/nodetypes/redhat.png'/>
            default:
                return ""
        }
    }
}
