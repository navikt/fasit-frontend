import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'


class Resource extends Component {
    constructor(props) {
        super(props)
    }


    showFasitData() {
        const fasitData = this.props.fasit.fasitData
        const isFetching = this.props.fasit.isFetching
        if (isFetching)
            return <img src="images/loading_spinner.gif" className="loading-spinner"/>
        else if (!fasitData)
            return <p>Missing in Fasit</p>
        return (
            <ul>

            </ul>
        )
    }

    showSeraData() {
        const seraData = this.props.sera.seraData
        const isFetching = this.props.sera.isFetching
        if (isFetching)
            return <img src="images/loading_spinner.gif" className="loading-spinner"/>
        else if (!seraData)
            return <p>Missing in sera</p>
        return (
            <ul>
                <li>HostName: {seraData.hostname}</li>
                <li>Site: {seraData.site}</li>
                <li>Type: {seraData.type}</li>
                <li>cpu: {seraData.cpu}</li>
                <li>mem: {seraData.memory}</li>
                <li>ip: {seraData.ipAddress }</li>
                <li>Site: {seraData.site}</li>
            </ul>)
    }
    showSlamData() {
        const slamData = this.props.slam.slamData
        const isFetching = this.props.slam.isFetching
        if (isFetching)
            return <img src="images/loading_spinner.gif" className="loading-spinner"/>
        else if (!slamData)
            return <p>No events</p>
        return (
            <ul>

            </ul>)
    }

    render() {
        const {resources, activeIndex} = this.props
        const hostname = this.props.params ? this.props.params.resource : resources[activeIndex].alias
        return (
            <div>
                <h1><Link
                    to={"/nodes/" + hostname}>{hostname}</Link>
                </h1>
                <hr />
                <br />
                <div className="col-md-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>Fasitdata</h4>
                        </div>
                        <div className="panel-body">

                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>SeraData</h4>
                        </div>
                        <div className="panel-body">
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h4>SlamData</h4>
                        </div>
                        <div className="panel-body">
                        </div>
                    </div>
                </div>
                <button type="button" className="btn btn-success">edit shit</button>
            </div>
        )
    }
}

Node.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        resources: state.resources.data,
        activeIndex: state.resources.active,
    }
}

export default connect(mapStateToProps)(Resource)