import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {fetchSeraData} from '../../actionCreators/node_sera'

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

    componentWillReceiveProps(nextProps) {
        const {hostname, dispatch} = this.props
        if (hostname != nextProps.hostname) {
            dispatch(fetchSeraData(nextProps.hostname))
        }
    }

    getPowerIcon(status) {
        if (status === 'poweredOn') {
            return <i className="fa fa-power-off powered-on" aria-hidden="true"/>
        }
        return <i className="fa fa-power-off powered-off" aria-hidden="true"/>

    }


    render() {
        const seraData = this.props.sera.data
        return (
            <div>
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
