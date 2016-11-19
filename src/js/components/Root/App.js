import React, {Component, PropTypes} from 'react'
import TopNav from '../Navigation/TopNav'
import ContextMenu from '../Navigation/ContextMenu'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import Home from '../Home'
import Node from '../Nodes/Node'
import Nodes from '../Nodes/Nodes'
import Resources from '../Nodes/Nodes'
import ElementList from '../common/ElementList'

class App extends Component {
    constructor(props) {
        super(props)
    }

    selectPaging(){
        const location = this.props.location.pathname
        switch(location){
            case "/nodes":
                return <Nodes />
            case "/resources":
                return <Resources />

        }


    }
    render() {
        console.log("app", this.props)
        const location = this.props.location.pathname
        const {nodes, resources} = this.props
        return (
            <div>
                <TopNav />
                <ContextMenu />
                <div className="col-md-2 nopadding side-menu-container">
                    <ul className="nav sidebar" id="side-menu">
                        <li>
                            <Link to="/" onlyActiveOnIndex><i className="fa fa-home" />Home</Link>
                        </li>
                        <li >
                            <Link to="/environments"><i className="fa fa-sitemap" />Environments</Link>
                        </li>
                        <li >
                            <Link to="/applications"><i className="fa fa-home fa-cube" />Applications</Link>
                        </li>
                        <li >
                            <Link to="/instances"><i className="fa fa-home fa-cubes" />Instances</Link>
                        </li>
                        <li >
                            <Link to="/nodes"><i className="fa fa-home fa-laptop" />Nodes</Link>
                            { location === "/nodes" ?<ElementList type="nodes" data={nodes} /> : <i />}
                        </li>
                        <li >
                            <Link to="/resources"><i className="fa fa-home fa-cutlery" />Resources</Link>
                            { location === "/resources" ?<ElementList type="resources" data={resources} /> : <i />}

                        </li>
                    </ul>
                    {this.selectPaging()}
                </div>
                <div className="col-md-10 main-content-container">
                    {this.props.params.node ? <Node hostname={this.props.params.node}/> : <Home />}
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        location: state.routing.locationBeforeTransitions,
        nodes: state.nodes,
        resources: state.resources,
    }

}
export default connect(mapStateToProps)(App)