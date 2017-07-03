import React, {Component} from 'react'
import {browserHistory} from 'react-router'
import {connect} from 'react-redux'
import Mousetrap from 'mousetrap'
import {submitNavSearch} from '../../actionCreators/common'
import {capitalize} from '../../utils/'

class NavSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null,
            visible: true
        }
    }

    componentDidMount() {
        this.navSearch.focus()
        Mousetrap.bind('g g', (e) => {e.preventDefault(); this.navSearch.focus()})
    }
    componentWillUnmount(){
        Mousetrap.unbind('g g')
    }

    handleMouseOver(navItem) {
        const {navSearch} = this.props
        const options = [...new Set(navSearch.data.map(result => result.id))]
        const mouseOverItem = options.indexOf(navItem.id)
        this.setState({selectedOption: mouseOverItem})
    }

    handleMouseClick(e) {
        e.preventDefault()
        this.navigate()
    }

    handleKeyDown(e) {

        const {location} = this.props
        switch (e.key) {
            case 'ArrowRight': // left
            case 'ArrowLeft': // left
                break // avoid visibility changing when moving sideways
            case 'Escape': // esc
                e.preventDefault()
                this.setState({visible: false})
                break
            case 'ArrowUp': // up
                e.preventDefault()

                this.setState({visible: true})
                this.changeSelectedOption("prev")
                break
            case 'ArrowDown': // down
                e.preventDefault()
                this.setState({visible: true})
                this.changeSelectedOption("next")
                break
            case 'Enter': // enter
                e.preventDefault()
                this.navigate()
                break
            default:
                // reset selectedOption and display dropdown if query changes
                this.setState({selectedOption: null, visible: true})
                if (location.pathname === "/") {
                    browserHistory.push("/search")
                }
        }
    }

    navigate() {
        const {dispatch, navSearch, location} = this.props
        const navItem = navSearch.data[this.state.selectedOption]
        if (!navItem) {
            if (!(location.pathname === "/search")) {
                browserHistory.push("/search")
            }

            browserHistory.push(`search/${navSearch.query}`)
            this.setState({visible: false})
        } else {
            dispatch(submitNavSearch(""))
            browserHistory.push(this.destinationUrl(navItem))
        }
    }


    changeSelectedOption(dir) {
        const {selectedOption} = this.state
        const {navSearch} = this.props
        const options = [...new Set(navSearch.data.map(result => result.id))]
        switch (dir) {
            case "prev":
                if (selectedOption === null || selectedOption === 0) {
                    this.setState({selectedOption: options.length - 1})
                } else {
                    this.setState({selectedOption: (selectedOption - 1)})
                }
                break

            case "next":
                if (selectedOption === null || selectedOption + 1 === options.length) {
                    this.setState({selectedOption: 0})
                } else {
                    this.setState({selectedOption: (selectedOption + 1)})
                }
                break
        }
    }

    destinationUrl(navItem) {
        switch (navItem.type) {
            case "node":
                return `/nodes/${navItem.name}`
            case "application":
                return `/applications/${navItem.name}`
            case "environment":
                return `/environments/${navItem.name}`
            case "resource":
                return `/resources/${navItem.id}`
            case "instance":
                return `/instances/${navItem.id}`
            case "cluster":
                return `/environments/${navItem.info.split(" |")[0]}/clusters/${navItem.name}`
            default:
                return "/"

        }
    }

    render() {
        const {dispatch, navSearch} = this.props
        const {visible, selectedOption} = this.state
        const {query, data, isFetching} = navSearch
        const types = [...new Set(data.map(item => item.type))]
        const options = [...new Set(data.map(item => item.id))]
        return (
            <div onKeyDown={(e) => this.handleKeyDown(e)} className="navSearchContainer">
                <form className="navSearchForm">
                    <input
                        type="text"
                        className="navSearchTextInput"
                        ref={(input) => this.navSearch = input}
                        placeholder={"Search"}
                        value={query}
                        onChange={(e) => dispatch(submitNavSearch(e.target.value))}
                    />
                    <button
                        type="submit"
                        className="navSearchButton"
                        onClick={(e) => {
                            e.preventDefault()
                            this.navigate()
                        }}><i className="fa fa-search"/></button>
                </form>
                {query && visible ? isFetching ?
                        <div className="navSearchDropdown loadingDots"/> :
                        <div className="navSearchDropdown">
                            {(data.length > 0) ? types.map((type, i) => { // Returnerer en blokk for hver elementtype
                                    return (
                                        <div key={i}>
                                            <b><i>
                                                <small>{capitalize(type)}{data.filter(itemsByType => itemsByType.type === type).length > 1 ? "s" : null}:</small>
                                            </i></b>
                                            <div>
                                                {data.filter(itemsByType => itemsByType.type === type) // filtrerer ut resultater per type
                                                    .map((navItem, i) => { // returnerer en lenke til resultatet
                                                        const active = navItem.id === options[selectedOption]
                                                        return (
                                                            <div
                                                                key={i}
                                                                onMouseEnter={() => this.handleMouseOver(navItem)}
                                                                onClick={(e) => this.handleMouseClick(e)}
                                                                className={ active ? "navOption selectedNavOption row" : "navOption row"}
                                                                style={{marginLeft:-10, marginRight:-20}}
                                                            >
                                                                    <div className="col-md-5 text-overflow">{navItem.name}</div>
                                                                    <div className="col-md-6 text-overflow"><small style={active ? {color: "#f5f5f5"} : {color: "#777"}}>{navItem.info}</small></div>
                                                            </div>)
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                }) : "No results found"
                            }
                        </div> :
                    null}

            </ div>)
    }
}


const mapStateToProps = (state) => {
    return {
        location: state.routing.locationBeforeTransitions,
        navSearch: state.navsearch
    }
}

export default connect(mapStateToProps)(NavSearch)
