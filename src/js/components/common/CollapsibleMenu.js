import React, {Component, PropTypes} from 'react'
import classString from 'react-classset'
import {List, ListItem} from 'material-ui/List'

export function CollapsibleMenu(props) {
    return (
        <div className="col-md-5">
            <div className="list-group">
                {props.children}
            </div>
        </div>
    )
}

export function CollapsibleList(props) {
    let {nestedItems, ...rest} = props

    return <List>
        <ListItem
            nestedItems={toArray(nestedItems)}
            {...rest}
            primaryTogglesNestedList={true}
        /></List>
}

function toArray(maybeArray) {
    if (Array.isArray(maybeArray)) {
        return maybeArray
    }
    let array = []
    array.push(maybeArray)
    return array
}

export function CollapsibleListItem(props) {
    return <ListItem {...props}/>
}

export class CollapsibleMenuItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayContent: props.defaultExpanded,
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
                <a className="list-group-item collapsible-menu-item"
                   onClick={() => this.toggleDisplay()}>
                    <i className={this.arrowDirection()}/>
                    <strong id="label" style={{marginLeft: 10}}>{this.props.label}</strong>
                </a>
                {this.state.displayContent ? this.props.children : null}
            </div>
        )
    }

}