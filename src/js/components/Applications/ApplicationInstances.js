import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import moment from 'moment'
import {connect} from 'react-redux'
import {Popover, OverlayTrigger} from 'react-bootstrap'
import {fetchApplicationInstances} from '../../actionCreators/application'


class ApplicationInstances extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, name} = this.props
        dispatch(fetchApplicationInstances(name))
    }

    createPopover(instance) {
            return (
                <Popover
                    className="popover-size"
                    id="Instance"
                    title={instance.application + ":" + instance.version + " in " + instance.environment}
                >
                    <b>Created:</b><span className="pull-right">{moment(instance.created).format('L, HH:mm')}</span><br />
                    <b>Updated:</b><span className="pull-right">{moment(instance.updated).format('L, HH:mm')}</span><br />
                    {Object.keys(instance.lifecycle).length > 0?
                        <div><b>Lifecycle:</b><span className="pull-right">{instance.lifecycle.status}</span><br /></div>:null
                    }
                </Popover>
            )
        }

    showInstances() {
        const {instances} = this.props
        if (instances.isFetching )
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>

        else if (instances.requestFailed)
            return <div>Retrieving revisions failed with the following message:
                <br />
                <pre><i>{instances.requestFailed}</i></pre>
            </div>

        return (
            <table className="table table-hover">
                <thead>
                <tr>
                    <th></th>
                    <th>Env.</th>
                    <th>Cluster</th>
                    <th>Instance</th>
                </tr>
                </thead>
                <tbody>
                {instances.data.map(instance => {
                    return <tr key={instance.id}>
                        <OverlayTrigger
                            trigger="click"
                            rootClose={true}
                            placement="left"
                            overlay={this.createPopover(instance)}
                        >
                            <td className="cursor-pointer"><i className="fa fa-search"/></td>
                        </OverlayTrigger>
                        <td><Link to={'/environments/' + instance.environment}>{instance.environment}</Link></td>
                        <td><Link to={'/environments/' + instance.environment + '/clusters/' + instance.cluster.name}>{instance.cluster.name}</Link></td>
                        <td><Link to={'/instances/' + instance.id}>{instance.application + ":" + instance.version}</Link></td>

                    </tr>
                })}
                </tbody>
            </table>
        )
    }
    render() {
        moment.locale('nb')
        return (
            <div>
                {this.showInstances()}
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    name: ownProps.name,
    instances: state.application_instances
})

export default connect(mapStateToProps)(ApplicationInstances)
