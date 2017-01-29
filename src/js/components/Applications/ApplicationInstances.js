import React, {Component, PropTypes} from 'react'
import moment from 'moment'
import {connect} from 'react-redux'
import {fetchApplicationInstances} from '../../actionCreators/application'


class ApplicationInstances extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, name} = this.props
        dispatch(fetchApplicationInstances(name))
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
                <tbody>
                {instances.data.map(instance => {
                    return <tr key={instance.id}>

                        <td>{instance.environment}</td>
                        <td>{moment(instance.created).format('L, HH:mm')}</td>


                    </tr>
                })}
                </tbody>
            </table>
        )
    }
    render() {
        moment.locale('nb')
        return (
            <div className="node-information-box">
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
