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


    render() {
        moment.locale('nb')
        return (
            <div className="node-information-box">
                <div>Plenty o instances</div>

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => ({
    name: ownProps.name,
})

export default connect(mapStateToProps)(ApplicationInstances)
