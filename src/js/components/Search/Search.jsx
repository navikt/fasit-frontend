import React, { useEffect } from "react";
import { connect } from "react-redux";
import history from "../../history"
import { Toolbar, Box, Divider, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { SEARCH_RESULT_TYPES } from "../Search/searchResultTypes";
import { colors, styles } from "../../commonStyles/commonInlineStyles";
import { setSearchString, submitSearch } from "../../actionCreators/common";
import SearchResultCard from "./SearchResultCard";

function Search({ dispatch, match, location, searchResults, searchQuery }) {

    useEffect(() => {
        if (match.params.query) {
            dispatch(setSearchString(match.params.query))
            dispatch(submitSearch(match.params.query, new URLSearchParams(location.search).get('type')))
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        if (match.params.query) {
            dispatch(submitSearch(match.params.query))
        }
    }, [match.params.query]) // eslint-disable-line react-hooks/exhaustive-deps

    const filterByType = (type) => {
        const newType = type === searchResults.filter ? null : type
        dispatch(submitSearch(searchQuery, newType))
        const newPath = newType ? `/search/${searchQuery}?type=${newType}` : `/search/${searchQuery}`
        history.push(newPath)
    }

    return (<div className="main-content-container">
        <ResultTypeFilters
            filter={searchResults.filter}
            resultTypes={toUniqeSortedArray(searchResults.data.map(result => result.type))}
            onFilterByType={filterByType}
        />
        <div className="row">
            <div className="col-sm-10">
                {searchResults.data.map((sr, idx) => (
                    <SearchResultCard key={idx} searchResult={sr} searchQuery={searchQuery} />
                ))}
            </div>
        </div>
    </div>)
}

const toUniqeSortedArray = (array) => {
    return Array.from(new Set(array)).sort()
}

const mapStateToProps = (state) => {
    return {
        searchResults: state.search,
        searchQuery: state.navsearch.query
    }
}

function ResultTypeFilters({ filter, resultTypes, onFilterByType }) {
    return (
        <Toolbar>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle1">Filter</Typography>
                {SEARCH_RESULT_TYPES.map((type) => (
                    <FilterButton
                        key={type}
                        disabled={!resultTypes.includes(type)}
                        activeFilter={filter}
                        type={type}
                        onClickHandler={() => onFilterByType(type)}
                    />
                ))}
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Divider orientation="vertical" flexItem style={{margin: "0 8px"}} />
                <Button variant="contained" disabled={!filter} disableRipple
                    style={{backgroundColor: colors.toolbarBackground, color: colors.white, ...styles.raisedButton}}
                    onClick={() => onFilterByType()}>
                    clear
                </Button>
            </Box>
        </Toolbar>
    )
}

function FilterButton({ type, onClickHandler, activeFilter, disabled }) {
    return (
        <Button
            variant="contained"
            disableRipple
            disabled={disabled}
            style={{backgroundColor: activeFilter === type ? colors.toolbarBackground : colors.white, color: activeFilter === type ? colors.white : colors.black}}
            onClick={onClickHandler}>
            {type}
        </Button>
    )
}

export default connect(mapStateToProps)(Search)
