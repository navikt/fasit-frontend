import React from 'react'
import classString from 'react-classset';
import {connect}from 'react-redux'
import TopNav from '../Navigation/TopNav'
import ContextMenu from '../Navigation/ContextMenu'
import SidebarNav from '../Navigation/SidebarNav'

const app = React.createClass({
    pageWrapper(sidebarMinimized) {
        return classString({
            'wrapper': !sidebarMinimized,
            'wrapper-toggled': sidebarMinimized

        })
    },
    sidebarWrapper(sidebarMinimized) {
        return classString({
            'sidebar-wrapper': !sidebarMinimized,
            'sidebar-wrapper-toggled': sidebarMinimized
        })
    },
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
});
const mapStateToProps = (state) => {
    return {sidebarMinimized: state.viewModes.sidebarMinimized}
}
export default connect(mapStateToProps)(app)

