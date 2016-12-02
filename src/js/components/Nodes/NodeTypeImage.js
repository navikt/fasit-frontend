import React, {Component, PropTypes} from 'react'

export default class NodeTypeImage extends Component {
    constructor(props) {
        super(props)
    }

    render() {
            const {type} = this.props
            switch (type) {
                case 'jboss':
                    return <img src='/images/nodetypes/jboss.png'/>
                case 'was':
                case 'bpm':
                    return <img src='/images/nodetypes/websphere.png'/>
                case 'docker':
                    return <img src='/images/nodetypes/security.png'/>
                case 'datapower_physical':
                case 'datapower_virtual':
                    return <img src='/images/nodetypes/oracle.png'/>
                case 'openam_server':
                case 'openam_proxy':
                    return <img src='/images/nodetypes/openam.png'/>
                case 'windows':
                case 'windows_terminalserver':
                case 'windows_appserver':
                case 'windows_iisserver':
                case 'windows_rptserver':
                    return <img src='/images/nodetypes/windows.png'/>
                default:
                    return <img src='/images/nodetypes/redhat.png'/>
            }
    }
}
