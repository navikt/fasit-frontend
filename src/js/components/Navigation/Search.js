import React from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import {setSearchLocation, setSearchString, changeFilter} from '../../actionCreators/filters'

const Search = React.createClass({
    elementFilterMapping: [
        {elementValue: "", label: "Everything"},
        {elementValue: "applications", label: "Applications"},
        {elementValue: "instances", label: "Instances"},
        {elementValue: "nodes", label: "Nodes"},
        {elementValue: "environments", label: "Environments"},
        {elementValue: "resources", label: "Resources"}
    ],

    handleSetSearchLocation(context){
        this.props.dispatch(setSearchLocation(context))
    },
    submitSearchString(e){
        if (e.charCode == 13 || e.type === "click") {
            let s = {}
            s.value = this.props.searchString
            switch (this.props.searchContext) {
                case 'nodes':
                    this.props.dispatch(changeFilter('hostname', s))
                    browserHistory.push('/nodes')
                    return
                case 'environments':
                    this.props.dispatch(changeFilter('environment', s))
                    browserHistory.push('/environments')
                    return
                case 'applications':
                    this.props.dispatch(changeFilter('application', s))
                    browserHistory.push('/applications')
                    return
                case 'instances':
                    this.props.dispatch(changeFilter('instances', s))
                    browserHistory.push('/instances')
                    return
            }
        }
    },
    handleSearchChange(e){
        this.props.dispatch(setSearchString(e.target.value))
    },
    findContextFilterName(searchContext) {
        const location = this.elementFilterMapping.filter(function (value) {
            return value.elementValue === searchContext
        })
        if (location.length > 0) {
            return location[0].label
        }
        return "Everything"
    },
    render() {

        const searchContext = this.props.searchContext

        return(
            <ul className="nav navbar-top-links navbar-filter-links">
                <li>
                    <div className="search-field">
                        <DropdownButton
                            bsStyle="link"
                            bsSize="small"
                            id="searchElement"
                            title={this.findContextFilterName(searchContext)}
                            onSelect={this.handleSetSearchLocation}
                        >
                            {this.elementFilterMapping.map(function (choice) {
                                return <MenuItem key={choice.elementValue}
                                                 eventKey={choice.elementValue}
                                                 active={searchContext === choice.elementValue}>{choice.label}</MenuItem>
                            })}
                        </DropdownButton>
                        <input
                            type="text"
                            ref={(ref) => this.userName = ref}
                            className="search-text"
                            value={this.props.searchString}
                            onChange={this.handleSearchChange}
                            onKeyPress={this.submitSearchString}


                        />
                    </div>
                </li>
                <button
                    type="submit"
                    className="btn btn-primary btn-sm"
                    onClick={this.submitSearchString}
                >
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </ul>
        )
    }
});

const mapStateToProps = (state) => {
    return {
        searchContext: state.search.context,
        searchString: state.search.searchString
    }
}

export default connect(mapStateToProps)(Search)