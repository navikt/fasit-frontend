import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'


class Lifecycle extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {lifecycle, jira, rescue} = this.props
        if (lifecycle === undefined) return null
         switch (lifecycle.status) {
            case "stopped":
                 return (
                    <div className="alert alert-danger col-md-8">
                        This element was stopped and will be <b>deleted</b><br />
                        {moment(lifecycle.nextactiondate).format('ll, HH:mm')}<br />
                        <button className="btn btn-link btn-sm" onClick={rescue}>
                            <i className="fa fa-recycle"/>&nbsp;&nbsp;Rescue
                        </button>
                    </div>
                )
            case "alerted":
                return (
                    <div className="alert alert-danger col-md-8">
                        This element is a candidate for deletion and will be <b>stopped</b> {moment(lifecycle.nextactiondate).format('ll, HH:mm')}
                        <br />See <a href={`${jira}/browse/${lifecycle.issue}`}
                                     target="jira">Jira-issue</a> for more details<br />

                    </div>
                )
            case "rescued":
                 return (
                        <div className="alert alert-danger col-md-8">
                            This element has been <b>rescued</b> from deletion until&nbsp;
                            <strong>{moment(lifecycle.nextactiondate).format('ll, HH:mm')}</strong><br />
                            See <a href={`${jira}/browse/${lifecycle.issue}`} target="jira"><b>Jira-issue</b></a> for
                            more details<br />
                        </div>
                )
            default :
                 return <div />
        }
    }
}

const mapStateToProps = (state) => {
    return {
        jira: state.configuration.jira,
    }
}

export default connect(mapStateToProps)(Lifecycle)
