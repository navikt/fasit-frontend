import React, {Component, PropTypes} from 'react'
import classString from 'react-classset'


export class CollapsibleMenu extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="col-md-5 col-md-offset-1">
                <div className="list-group">
                    {this.props.children}
                </div>
            </div>
        )

    }
}

export class CollapsibleMenuItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayContent: false,
        }
    }

    toggleDisplay() {
        this.setState({displayContent: !this.state.displayContent})
    }

    arrowDirection() {
        return classString({
            "fa": true,
            "fa-fw": true,
            "fa-angle-right": !this.state.displayContent,
            "fa-angle-down": this.state.displayContent
        })
    }

    render() {
        return (
            <div>
            <a className="list-group-item node-list-item"
               onClick={() => this.toggleDisplay()}>
                <i className={this.arrowDirection()}/>&emsp;
                {this.props.label}
            </a>
                {this.state.displayContent?this.props.children:<div/>}
            </div>
        )
    }

}