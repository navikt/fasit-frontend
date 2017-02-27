import React, {Component, PropTypes} from 'react'
import classString from 'react-classset'

export function CollapsibleMenu(props) {
    return (
        <div className="col-md-5 col-md-offset-1">
            <div className="list-group">
                {props.children}
            </div>
        </div>
    )
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
                    <strong id="label">{this.props.label}</strong>
                </a>
                {this.state.displayContent ? this.props.children : null}
            </div>
        )
    }

}