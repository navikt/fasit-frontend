import React, {Component, PropTypes} from 'react'
import classString from 'react-classset';
import {connect}from 'react-redux'
import TopNav from '../Navigation/TopNav'
import ContextMenu from '../Navigation/ContextMenu'
import SidebarNav from '../Navigation/SidebarNav'

class App extends Component {
    constructor(props) {
        super(props)
    }

    pageWrapper(sidebarMinimized) {
        return classString({
            'wrapper': !sidebarMinimized,
            'wrapper-toggled': sidebarMinimized

        })
    }

    sidebarWrapper(sidebarMinimized) {
        return classString({
            'sidebar-wrapper': !sidebarMinimized,
            'sidebar-wrapper-toggled': sidebarMinimized
        })
    }

    render() {
        const sidebarMinimized = this.props.sidebarMinimized
        return (
            <div>
                <div className={this.pageWrapper(sidebarMinimized)}>
                    <div id={this.sidebarWrapper(sidebarMinimized)}>
                        <SidebarNav/>
                    </div>
                    <div id="page-content-wrapper">
                        <TopNav />
                        <ContextMenu />
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {sidebarMinimized: state.configuration.sidebarMinimized}
}
export default connect(mapStateToProps)(App)

