import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

class Instance extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        const {instances, activeInstance} = this.props
        const id = this.props.params ? this.props.params.instance : instances[activeInstance].id
        const instance = this.props.params ? this.props.params.instance : instances[activeInstance].application
        return (
            <div>
                <h1><Link
                    to={"/instances/" + id}>{instance}</Link>
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
        instances: state.instances.data,
        activeInstance: state.instances.active,
    }
}

export default connect(mapStateToProps)(Instance)