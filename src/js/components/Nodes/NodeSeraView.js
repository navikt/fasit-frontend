import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchSeraData } from '../../actionCreators/node'
import { List, ListItem } from 'material-ui/List'
import { icons } from '../../commonStyles/commonInlineStyles'
import moment from 'moment'

class NodeSeraView extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { hostname, dispatch } = this.props
        if (hostname) {
            dispatch(fetchSeraData(hostname))
        }
    }

    /*getPowerIcon(status) {
        if (status === 'poweredOn') {
            return <i className="fa fa-power-off powered-on" aria-hidden="true" />
        }
        return <i className="fa fa-power-off powered-off" aria-hidden="true" />

    }
    
     {/*<table>
                    <tbody>
                        <tr>
                            <td>{this.getPowerIcon(sera.data.status)}</td>
                            <td colSpan="2">{sera.data.status ? "Running" : "Powered off"}</td>
                        </tr>
                        <tr>
                            <td width="30"><i className="fa fa-cogs" aria-hidden="true" /></td>
                            <td width="30">{sera.data.cpu}</td>
                            <td>CPU</td>
                        </tr>
                        <tr>
                            <td><i className="fa fa-archive" aria-hidden="true" /></td>
                            <td>{sera.data.memory}</td>
                            <td>GB RAM</td>
                        </tr>
                        <tr>
                            <td><i className="fa fa-hdd-o" aria-hidden="true" /></td>
                            <td>{sera.data.disk}</td>
                            <td>GB HDD</td>
                        </tr>
                        <tr>
                            <td><i className="fa fa-university" aria-hidden="true" /></td>
                            <td>{sera.data.site}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><i className="fa fa-location-arrow" aria-hidden="true" /></td>
                            <td colSpan="2">{sera.data.ipAddress}</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><i className="fa fa-usd" aria-hidden="true" /></td>
                            <td colSpan="2">{Object.values(sera.data.calculations).reduce((a, b) => a + b)},- /år</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>}

    */



    render() {
        moment.locale("en")
        const { sera } = this.props
        const listItemStyle = { fontSize: '14px', margin: '0px', paddingBottom: '5px', paddingTop: '5px' }
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
                <List>
                    <ListItem primaryText={`IP: ${sera.data.ipAddress}`} style={listItemStyle} disabled={true} insetChildren={true} />
                    <ListItem primaryText={`Status: ${sera.data.status ? "Running" : "Powered off"}`} style={listItemStyle} disabled={true} insetChildren={true} />
                    <ListItem primaryText={`Site: ${sera.data.site}`} style={listItemStyle} disabled={true} insetChildren={true} />
                    <ListItem primaryText={`${sera.data.cpu} CPU`} style={listItemStyle} disabled={true} insetChildren={true} />
                    <ListItem primaryText={`${sera.data.memory} GB memory`} style={listItemStyle} disabled={true} insetChildren={true} />
                    <ListItem primaryText={`${sera.data.disk} GB disk`} style={listItemStyle} disabled={true} insetChildren={true} />
                    <ListItem primaryText={`${Object.values(sera.data.calculations).reduce((a, b) => a + b)},- pr year`} style={listItemStyle} disabled={true} insetChildren={true} />
                    {sera.data.rpm_rpm && <ListItem primaryText={`RPM: ${sera.data.rpm_rpm}:${sera.data.rpm_version}`} style={listItemStyle} disabled={true} insetChildren={true} />}
                    {sera.data.rpm_rpm && <ListItem primaryText={`RPM deployed: ${moment(sera.data.rpm_time).format('DD MMM YYYY HH:mm:ss')}`} style={listItemStyle} disabled={true} insetChildren={true} />}
                </List>
            </div>
        )
    }
}

NodeSeraView.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        sera: state.node_sera
    }
}

export default connect(mapStateToProps)(NodeSeraView)
