import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import moment from 'moment'


class Lifecycle extends Component {
    constructor(props) {
        super(props)
        this.state={visible:true}
    }

    render() {
        const {lifecycle, jira, rescueAction} = this.props
        if (lifecycle === undefined) return null
        if (!this.state.visible) return null
         switch (lifecycle.status) {
            case "stopped":
                 return (
                     <div className="alert alert-dismissible alert-info col-md-8">
                         <button type="button" className="close" onClick={() => this.setState({visible:false})}>&times;</button>
                         This element was stopped and will be <b>deleted</b><br />
                        {moment(lifecycle.nextactiondate).format('ll, HH:mm')}<br />
                        <button className="btn btn-primary btn-sm" onClick={rescueAction} style={{marginRight:5}}>
                            <i className="fa fa-recycle"/>&nbsp;&nbsp;Rescue
                        </button>
                    </div>
                )
            case "alerted":
                return (
                    <div className="alert alert-dismissible alert-info col-md-8">
                        <button type="button" className="close" onClick={() => this.setState({visible:false})}>&times;</button>
                        This element is a candidate for deletion and will be <b>stopped</b><br />
                        {moment(lifecycle.nextactiondate).format('ll, HH:mm')}
                        <br />See <a href={`${jira}/browse/${lifecycle.issue}`}
                                     target="jira">Jira-issue</a> for more details<br />
                        <button className="btn btn-primary btn-sm pull-right" onClick={rescueAction} style={{position:"relative", right:-25, bottom:-5}}>
                            <i className="fa fa-recycle"/>&nbsp;&nbsp;Rescue
                        </button>

                    </div>
                )
            case "rescued":
                 return (
                     <div className="alert alert-dismissible alert-info col-md-8">
                         <button type="button" className="close" onClick={() => this.setState({visible:false})}>&times;</button>
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
