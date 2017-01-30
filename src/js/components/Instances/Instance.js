import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormString} from '../common/Forms'
import {CollapsibleMenu, CollapsibleMenuItem, RevisionsView} from '../common/'
import {
    fetchInstance
} from '../../actionCreators/instance'


class Instance extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, id} = this.props
        dispatch(fetchInstance(id))
    }

    render() {
        const {instance} = this.props

        return (
            <div className="row">
                <div className="col-md-6">
                    <FormString
                        label="application"
                        value={instance.application}
                    />
                    <FormString
                        label="version"
                        value={instance.version}
                    />
                    <FormString
                        label="environment"
                        value={instance.environment}
                    />
                </div>
                <CollapsibleMenu>
                    <CollapsibleMenuItem label="Revisions">
                    </CollapsibleMenuItem>
                </CollapsibleMenu>

            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        instance: state.instance_fasit.data,
        user: state.user,
        editMode: state.nodes.showEditNodeForm,
        hostname: ownProps.hostname,
        config: state.configuration,
        id: ownProps.id
    }
}

export default connect(mapStateToProps)(Instance)
