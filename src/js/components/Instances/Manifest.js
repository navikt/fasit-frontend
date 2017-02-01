import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import pd from 'pretty-data'
import {
    fetchManifest
} from "../../actionCreators/instance"

class Manifest extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const {dispatch} = this.props
        dispatch(fetchManifest())
    }

    render() {

        console.log(pd)

        return (
           <div>

           </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        manifest: state.instance_fasit.manifest
    }
}

export default connect(mapStateToProps)(Manifest)