import React, {Component, PropTypes} from 'react'
import TopNav from '../Navigation/TopNav'
import ContextMenu from '../Navigation/ContextMenu'

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <TopNav />
                <ContextMenu />
                {this.props.children}
            </div>
        )
    }
}
