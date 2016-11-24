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
                <div className="col-lg-9 col-lg-offset-2 col-md-11 col-md-offset-1 col-sm-12">
                    {this.props.children}
                </div>
            </div>
        )
    }
}