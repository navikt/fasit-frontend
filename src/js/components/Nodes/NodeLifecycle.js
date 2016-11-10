import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'


class NodeLifecycle extends Component {
    constructor(props) {
        super(props)
    }

    showStatus() {
        const {lifecycle, jira, rescue} = this.props
        switch (lifecycle.status) {
            case "alerted":
                return (<div>
                    <div className="col-md-3 text-center">
                        <i className="fa fa-exclamation-triangle fa-3x event-warning "/>
                        <br />
                        <button className="btn btn-warning btn-xs" onClick={rescue}>
                            <i className="fa fa-recycle"/>&nbsp;&nbsp;Rescue
                        </button>
                    </div>
                    <div className="col-md-9">
                        This element is a candidate for deletion and will be
                        <b>stopped</b> {moment(lifecycle.nextactiondate).format('ll, HH:mm')}
                        <br />See <a href={`${jira}/browse/${lifecycle.issue}`}
                                     target="jira">Jira-issue</a> for more details<br />

                    </div>
                </div>)
            case "stopped":
                console.log("lifecycle", lifecycle)
                return (<div>
                    <div className="col-md-3 text-center">
                        <i className="fa fa-stop-circle-o fa-3x event-error"/>
                        <button className="btn btn-danger btn-xs"  onClick={rescue}>
                            <i className="fa fa-recycle"/>&nbsp;&nbsp;Rescue
                        </button>
                    </div>
                    <div className="col-md-9 ">
                        This element was stopped and will be <b>deleted</b> {moment(lifecycle.nextactiondate).format('ll, HH:mm')}
                    </div>
                </div>)
            case "running":
                return <i className="fa fa-play fa-3x event-ok"/>
            case "rescued":
                console.log("lifecycle", lifecycle)
                return (<div>
                        <div className="col-md-3 text-center">
                            <i className="fa fa-recycle fa-3x event-success " style={{padding: 10 + 'px'}}/>
                        </div>
                        <div className="col-md-9 ">
                            This element has been <b>rescued</b> from deletion until &nbsp;
                            {moment(lifecycle.nextactiondate).format('ll, HH:mm')}<br />
                            See <a href={`${jira}/browse/${lifecycle.issue}`} target="jira"><b>Jira-issue</b></a> for
                            more details<br />
                        </div>
                    </div>
                )

            default:
                return <div></div>

        }
    }

    render() {
        return (
            <div className="col-lg-8 col-lg-offset-4 col-md-12">
                <div className="information-box">
                    <div className="information-box-header">
                        <div className="information-box-title text-overflow">
                            <span><i className="fa fa-recycle"></i><span className="hidden-md">&nbsp;&nbsp;
                                Lifecycle</span></span>
                        </div>
                    </div>
                    <div className="information-box-body row">
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
        jira: state.configuration.jira,
        lifecycle: ownProps.lifecycle,
        rescue: ownProps.rescueAction
    }
}

export default connect(mapStateToProps)(NodeLifecycle)
