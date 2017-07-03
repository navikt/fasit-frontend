import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    fetchManifest
} from "../../actionCreators/instance"
import PrettyXml from '../common/PrettyXml'

class Manifest extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchManifest())
    }

    render() {
        return (<PrettyXml xml={this.props.manifest}/>)
    }
}


const mapStateToProps = (state) => {
    return {
        manifest: state.instance_fasit.manifest
    }
}

export default connect(mapStateToProps)(Manifest)