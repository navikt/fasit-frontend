import React, {Component, PropTypes} from 'react'

import TopNav from '../Navigation/TopNav'


export default class App extends Component {
    constructor(props) {
        super(props)
    }

   render() {
        return (
            <div>
                <TopNav />
                <div className="col-lg-10 col-lg-offset-1 col-md-12">
                    {this.props.children}
                </div>
            </div>
        )
    }
}