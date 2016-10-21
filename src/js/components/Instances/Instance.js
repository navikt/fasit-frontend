import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
//import {fetchInstanceData} from '../../actionCreators/instance_fasit'

class Node extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch, name} = this.props
        //dispatch(fetchInstanceData(name))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, name} = this.props
        if (name != nextProps.name) {
            // dispatch(fetchInstanceData(nextProps.name))
        }
    }

    showFasitData() {
        const {fasit, editMode}= this.props
        if (fasit.isFetching || !fasit.data)
            return <i className="fa fa-spinner fa-pulse fa-2x"></i>

        else if (fasit.requestFailed)
            return (
                <div>Retrieving Fasit-data failed:
                    <br />
                    <br />
                    <pre><i>{fasit.requestFailed}</i></pre>
                </div>
            )

        else if (editMode) {
            return <NodeFasitViewEditMode />
        } else {
            return <NodeFasitViewPreviewMode />
        }
    }

    render() {
        return (
            <div>
                <div className="col-md-6">
                    {/*{this.showFasitData()}*/}
                </div>
                <div className="col-md-3">
                    <div className=" panel panel-default">
                        <div className=" panel-heading">
                            Todo:
                        </div>
                        <div className=" panel-body">
                            <ul>
                                <ul>
                                    <li>Overview</li>
                                    <li>Cluster</li>
                                    <li>App</li>
                                    <li>Nodes</li>
                                </ul>

                                <li>liste over de applikasjonsinstansene som fins i miljøet</li>
                                <li>ressursbruk</li>
                                <li>avhengighetsgraf</li>
                                <li>feil/advarsler for miljøet</li>
                                <li>statistikker (antall applikasjoner, servere, lenke til rapporter?)</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        instance: state.instance_fasit,
        name: ownProps.name,
    }
}

export default connect(mapStateToProps)(Node)
