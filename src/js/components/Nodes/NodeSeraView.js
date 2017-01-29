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
        console.log(sera)
        if (sera.isFetching)
            return (<i className="fa fa-spinner fa-pulse fa-2x"></i>)

        else if (sera.requestFailed || !sera.data) {
            return (
                <div className="node-information-box">Retrieving failed:
                    <br />
                    <br />
                    <pre><i>{sera.requestFailed || "No data available"}</i></pre>
                </div>
            )
        }
        return (
            <div className="node-information-box">
                <table>
                    <tr>
                        <td>{this.getPowerIcon(sera.data.status)}</td>
                        <td colSpan="2">{sera.data.status?"Running":"Powered off"}</td>
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
                </table>

            </div>
        )
    }

    /*            <div>
     <div className="col-md-2 sera-data-tile">
     <span className="sera-data-tile-top"><i className="fa fa-cogs" aria-hidden="true"/>&nbsp;&nbsp;
     CPU</span><br />
     <span className="sera-data-tile-middle">{seraData ? seraData.cpu : "?"}</span>
     <span className="sera-data-tile-bottom"></span>
     </div>
     <div className="col-md-2 sera-data-tile">
     <span className="sera-data-tile-top"><i className="fa fa-archive"
     aria-hidden="true"/>&nbsp;&nbsp;Memory</span>
     <span className="sera-data-tile-middle">{seraData ? seraData.memory : "?"} GB</span>
     <span className="sera-data-tile-bottom"></span>
     </div>
     <div className="col-md-2 sera-data-tile">
     <span className="sera-data-tile-top"><i className="fa fa-hdd-o" aria-hidden="true"/>&nbsp;&nbsp;
     HDD</span>
     <span className="sera-data-tile-middle">{seraData ? seraData.disk : "?"} GB</span>
     <span className="sera-data-tile-bottom"></span>
     </div>
     <div className="col-md-2 sera-data-tile">
     <span className="sera-data-tile-top"><i className="fa fa-university"
     aria-hidden="true"/>&nbsp;&nbsp;Site</span>
     <span className="sera-data-tile-middle">{seraData ? seraData.site : "?"}</span>
     <span className="sera-data-tile-bottom"></span>
     </div>
     <div className="col-md-2 sera-data-tile">
     <span className="sera-data-tile-top"><i className="fa fa-location-arrow"
     aria-hidden="true"/>&nbsp;&nbsp;IP-address</span>
     <span className="sera-data-tile-middle">{seraData ? seraData.ipAddress : "?"}</span>
     <span className="sera-data-tile-bottom"></span>
     </div>
     <div className="col-md-2 sera-data-tile">
     <span className="sera-data-tile-top"><i className="fa fa-power-off"
     aria-hidden="true"/>&nbsp;&nbsp;Running</span>
     <span className="sera-data-tile-middle">{seraData ? this.getPowerIcon(seraData.status) : "?"}</span>
     <span className="sera-data-tile-bottom"></span>
     </div>
     </div>*/
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
