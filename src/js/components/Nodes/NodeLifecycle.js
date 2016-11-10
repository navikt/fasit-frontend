import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'


class NodeLifecycle extends Component {
    constructor(props) {
        super(props)
    }

    showStatus() {
        const {lifecycle} = this.props
        switch (lifecycle.status) {
            case "alerted":
                return (<div>
                    <div className="col-md-3">
                    <i className="fa fa-exclamation-triangle fa-3x event-warning "/><br />
                        </div>

                    This element is a candidate for deletion and will be
                    deleted {moment(lifecycle.nextactiondate).format('ll, HH:mm')}
                    <br />See <a href={`http://jira-q1.adeo.no/browse/${lifecycle.issue}`}
                                 target="jira">Jira-issue</a> for more details<br />
                    <button className="btn btn-warning btn-xs"><i
                        className="fa fa-recycle"/>&nbsp;&nbsp;Rescue
                    </button>

                </div>)
            case "stopped":
                return <i className="fa fa-ban fa-3x event-error"/>
            case "running":
                return <i className="fa fa-play fa-3x event-ok"/>
            case "rescued":
                return <i className="fa fa-3x fa-recycle event-success"/>


        }
    }

    render() {
        const {lifecycle} = this.props
        console.log(lifecycle)
        return (
            <div className="col-lg-8 col-lg-offset-4 col-md-12">
                <div className="information-box">
                    <div className="information-box-header">
                        <div className="information-box-title text-overflow">
                            <span><i className="fa fa-recycle"></i><span className="hidden-md">&nbsp;&nbsp;
                                Lifecycle</span></span>
                        </div>
                    </div>
                    <div className="information-box-body">
                        {this.showStatus()}
                    </div>
                </div>
            </div>
        )
    }

}

Node.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => {
    return {
        lifecycle: ownProps.lifecycle
    }
}

export default connect(mapStateToProps)(NodeLifecycle)
