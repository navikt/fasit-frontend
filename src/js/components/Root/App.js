import React, {Component, PropTypes} from 'react'
import TopNav from '../Navigation/TopNav'
import ContextMenu from '../Navigation/ContextMenu'
import {Link} from 'react-router'
import Home from '../Home'
import Node from '../Nodes/Node'
import Nodes from '../Nodes/Nodes'

export default class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log("app", this)
        return (
            <div>
                <TopNav />
                <ContextMenu />
                <div className="col-md-2 nopadding side-menu-container">
                    <Link to='/resources/' className="side-menu-item" activeClassName='side-menu-item-active'>
                        <i className="fa fa-home fa-cutlery"/> Resources
                    </Link>
                    <Nodes />
                </div>
                <div className="col-md-10 main-content-container">
                    {this.props.params.node ? <Node hostname={this.props.params.node}/> : <Home />}
                </div>
            </div>
        )
    }
}
