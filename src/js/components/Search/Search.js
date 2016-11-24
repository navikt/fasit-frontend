import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import SearchInput from './SearchInput'

export default class Home extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <div>
                Here be searchresults!
            </div>
        )
    }

}
