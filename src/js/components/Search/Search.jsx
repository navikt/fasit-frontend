import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history"
import { Card, CardActions, CardContent, CardHeader, Toolbar, Box, Divider, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material";
import Button from "@mui/material/Button";
import { APPCONFIG, CLUSTER, destinationUrl, INSTANCE, RESOURCE, SEARCH_RESULT_TYPES } from "../Search/searchResultTypes";
import { colors, icons, styles } from "../../commonStyles/commonInlineStyles";
import { CardInfo } from "../common/index";
import { capitalize } from "../../utils/stringUtils";
import { WebsphereManagementConsole } from "../common";
import { getResourceTypeName, resourceTypeIcon } from "../../utils/resourceTypes";
import { setSearchString, submitSearch } from "../../actionCreators/common";
import PrettyXml from "../common/PrettyXml";

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

    const cellContents = (key, value) => {
        if (Array.isArray(value)) {
            return value.map((v, idx) => (<span key={idx}>{v}<br /></span>))
        }

        switch (key.toLowerCase()) {
            case "appconfig":
                return <PrettyXml xml={value} filter={match.params.query} />
            case "applicationproperties":
                return value.split('\n').map((v, idx) => (<span key={idx}>{v}<br /></span>))
            default:
                return value
        }
    }

    const additionalCardInfo = (searchResult) => {
        return (<CardInfo lastUpdated={searchResult.lastchange} lifecycle={searchResult.lifecycle} />)
    }

    const searchResultCard = (searchResult, idx) => {
        let title = searchResult.name
        let avatar = icons[searchResult.type]
        let subtitle = capitalize(searchResult.type)

        const detailedInfo = searchResult.detailedinfo || searchResult.detailedInfo || {}
        const hasDetailedInfo = Object.keys(detailedInfo).length > 0

        switch (searchResult.type) {
            case RESOURCE:
                title = `${getResourceTypeName(detailedInfo.type)} ${searchResult.name}`
                subtitle = `${subtitle} ${detailedInfo.scope}`
                avatar = resourceTypeIcon(detailedInfo.type)
                break
            case CLUSTER:
                subtitle = searchResult.info
                break
            case INSTANCE:
            case APPCONFIG:
                subtitle = capitalize(detailedInfo.environment || searchResult.type)
                break
        }

        return (
            <div style={styles.paddingTop5} key={idx}>
                <Card>
                    <CardHeader title={<Link to={destinationUrl(searchResult)}>{title}</Link>}
                        subheader={subtitle}
                        style={{ paddingTop: '7px', paddingBottom: '7px' }}
                        avatar={avatar}
                        children={additionalCardInfo(searchResult)} />

                    {hasDetailedInfo && <CardContent>
                        <Table>
                            <TableBody>
                                {Object.keys(detailedInfo)
                                    .filter(di => detailedInfo[di] !== null && detailedInfo[di] !== '')
                                    .sort()
                                    .map((di) => {
                                        return (
                                            <TableRow key={di}>
                                                <TableCell style={styles.tableCellPadding}
                                                    className={"col-sm-2"}>
                                                    {capitalize(di)}
                                                </TableCell>
                                                <TableCell style={styles.tableCellPadding}
                                                    className="text-overflow">
                                                    {cellContents(di, detailedInfo[di])}
                                                </TableCell>
                                            </TableRow>)
                                    })}
                            </TableBody>
                        </Table>
                    </CardContent>}
                    {searchResult.type === RESOURCE
                        && detailedInfo.type && detailedInfo.type.toLowerCase() === 'deploymentmanager'
                        && <CardActions style={{ paddingTop: '0px' }}>
                            <WebsphereManagementConsole hostname={detailedInfo.hostname} />)
                    </CardActions>}
                </Card>
            </div>)
    }

    const filterByType = (type) => {
        dispatch(submitSearch(searchQuery, type))
        const newPath = type ? `/search/${searchQuery}?type=${type}` : `/search/${searchQuery}`
        history.push(newPath)
    }

    const resultTypeFilters = () => {
        const filter = searchResults.filter
        const resultTypes = toUniqeSortedArray(searchResults.data.map(result => result.type));

        return (
            <Toolbar>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1">Filter</Typography>
                    {SEARCH_RESULT_TYPES.map((type) => {
                        return (
                            <FilterButton
                                key={type}
                                disabled={!resultTypes.includes(type)}
                                activeFilter={filter}
                                type={type}
                                onClickHandler={() => filterByType(type)} />)
                    })}

                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Divider orientation="vertical" flexItem style={{margin: "0 8px"}} />
                    <Button variant="contained" disabled={!searchResults.filter} disableRipple
                        style={{backgroundColor: colors.toolbarBackground, color: colors.white, ...styles.raisedButton}}
                        onClick={() => filterByType()}>
                        clear
                    </Button>
                </Box>
            </Toolbar>)
    }

    return (<div className="main-content-container">
        {resultTypeFilters()}
        <div className="row">
            <div className="col-sm-12">
                {searchResults.data.map((sr, idx) => searchResultCard(sr, idx))}
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

function FilterButton(props) {
    const { type, onClickHandler, activeFilter, disabled } = props
    return (<Button
        key={type}
        variant="contained"
        disableRipple
        disabled={disabled}
        style={{backgroundColor: activeFilter === type ? colors.toolbarBackground : colors.white, color: activeFilter === type ? colors.white : colors.black}}
        onClick={onClickHandler}>
        {type}
    </Button>)
}

export default connect(mapStateToProps)(Search)
