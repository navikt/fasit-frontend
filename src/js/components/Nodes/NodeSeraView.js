import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchSeraData} from '../../actionCreators/node'

class NodeSeraView extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {hostname, dispatch} = this.props
        if (hostname) {
            dispatch(fetchSeraData(hostname))
        }
    }

    getPowerIcon(status) {
        if (status === 'poweredOn') {
            return <i className="fa fa-power-off powered-on" aria-hidden="true"/>
        }
        return <i className="fa fa-power-off powered-off" aria-hidden="true"/>

    }


    render() {
        const {sera} = this.props
        if (sera.isFetching)
            return (<i className="fa fa-spinner fa-pulse fa-2x"></i>)

        else if (sera.requestFailed || !sera.data) {
            return (
                <div className="collapsible-menu-content-container">Retrieving failed:
                    <br />
                    <br />
                    <pre><i>{sera.requestFailed || "No data available"}</i></pre>
                </div>
            )
        }
        return (
            <div className="collapsible-menu-content-container">
                <table>
                    <tbody>
                    <tr>
                        <td>{this.getPowerIcon(sera.data.status)}</td>
                        <td colSpan="2">{sera.data.status ? "Running" : "Powered off"}</td>
                    </tr>
                    <tr>
                        <td width="30"><i className="fa fa-cogs" aria-hidden="true"/></td>
                        <td width="30">{sera.data.cpu}</td>
                        <td>CPU</td>
                    </tr>
                    <tr>
                        <td><i className="fa fa-archive" aria-hidden="true"/></td>
                        <td>{sera.data.memory}</td>
                        <td>GB RAM</td>
                    </tr>
                    <tr>
                        <td><i className="fa fa-hdd-o" aria-hidden="true"/></td>
                        <td>{sera.data.disk}</td>
                        <td>GB HDD</td>
                    </tr>
                    <tr>
                        <td><i className="fa fa-university" aria-hidden="true"/></td>
                        <td>{sera.data.site}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><i className="fa fa-location-arrow" aria-hidden="true"/></td>
                        <td colSpan="2">{sera.data.ipAddress}</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td><i className="fa fa-usd" aria-hidden="true"/></td>
                        <td colSpan="2">{Object.values(sera.data.calculations).reduce((a, b) => a + b)},- /år</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>

            </div>
        )
    }
}

NodeSeraView.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        sera: state.node_sera,
        hostname: ownProps.hostname
    }
}

export default connect(mapStateToProps)(NodeSeraView)
