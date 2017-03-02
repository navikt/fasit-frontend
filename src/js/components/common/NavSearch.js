import React, {Component, PropTypes} from 'react'
import {browserHistory} from 'react-router'

import {connect} from 'react-redux'
import {submitNavSearch} from '../../actionCreators/common'


class NavSearch extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedOption: null
        }
    }

    componentDidMount() {
        this.navSearch.focus()
    }

    handleKeyDown(e) {
        const {navSearch} = this.props
        switch (e.keyCode) {
            case 38: // up
                e.preventDefault()
                this.changeSelectedOption("prev")
                break
            case 40: // down
                e.preventDefault()
                this.changeSelectedOption("next")
                break
            case 13: // enter
                e.preventDefault()
                const destination = navSearch.data[this.state.selectedOption]
                browserHistory.push(`/${destination.type}s/${destination.name}`)
                break
            default:
                this.setState({selectedOption:null})
        }
    }

    changeSelectedOption(dir) {
        const {navSearch} = this.props
        const options = [...new Set(navSearch.data.map(result => result.name))]
        switch (dir) {
            case "prev":
                if (this.state.selectedOption === null || this.state.selectedOption === 0) {
                    this.setState({selectedOption: options.length -1})
                } else {
                    this.setState({selectedOption: (this.state.selectedOption - 1)})
                }
                break

            case "next":
                if (this.state.selectedOption === null || this.state.selectedOption +1 === options.length ) {
                    this.setState({selectedOption: 0})
                } else {
                    this.setState({selectedOption: (this.state.selectedOption + 1)})
                }
                break
        }
    }

    render() {
        const {dispatch, navSearch, location} = this.props
        const {query, data, isFetching} = navSearch
        const types = [...new Set(data.map(result => result.type))]
        const options = [...new Set(data.map(result => result.name))]
        const context = location.pathname.split('/')[1] || "anything"
        return (<div onKeyDown={(e) => this.handleKeyDown(e)}>
            <form>
                <input
                    type="text"
                    className="form-control search-field-text-input"
                    ref={(input) => {
                        this.navSearch = input
                    }}
                    placeholder={'Search for ' + context}
                    value={query}
                    onChange={(e) => dispatch(submitNavSearch(e.target.value))}
                />
                <button
                    type="submit"
                    className="search-field-button btn-grey"
                    onClick={(e) => {
                        e.preventDefault();
                        browserHistory.push("/search")
                    }}
                ><i className="fa fa-search"/></button>
            </form>
            {query ? isFetching ?
                    <div className="navSearchContainer"><i className="fa fa-spinner fa-pulse fa-2x"></i></div> :
                    <div className="navSearchContainer">
                        {(data.length > 0) ? types.map((type, i) => {
                                return (
                                    <div key={i}>
                                        <b><i>{type}(s)</i></b>
                                        <ul style={{listStyleType: "none"}}>
                                            {data.filter(r => r.type === type).map((e, i) => <li key={i} className={e.name === options[this.state.selectedOption] ? "selectedNavOption" : null}>{e.name}</li>)}
                                        </ul>
                                    </div>
                                )
                            }) : "No results found"
                        }
                    </div> :
                null}

        </ div>)
    }
}
NavSearch.propTypes = {
    dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        location: state.routing.locationBeforeTransitions,
        navSearch: state.navsearch
    }
}

export default connect(mapStateToProps)(NavSearch)
