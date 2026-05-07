import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import {
    fetchManifest
} from "../../actionCreators/instance"
import PrettyXml from '../common/PrettyXml'

function Manifest({ dispatch, manifest }) {
    useEffect(() => {
        dispatch(fetchManifest())
    }, [])

    return (<PrettyXml xml={manifest}/>)
}


const mapStateToProps = (state) => {
    return {
        manifest: state.instance_fasit.manifest
    }
}

export default connect(mapStateToProps)(Manifest)