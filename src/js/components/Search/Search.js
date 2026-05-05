import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../history"
import { Card, CardActions, CardContent, CardHeader, Toolbar, Box, Divider, Typography, Table, TableBody, TableRow, TableCell } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { APPCONFIG, CLUSTER, destinationUrl, INSTANCE, RESOURCE, SEARCH_RESULT_TYPES } from "../Search/searchResultTypes";
import { colors, icons, styles } from "../../commonStyles/commonInlineStyles";
import { CardInfo } from "../common/";
import { capitalize } from "../../utils/";
import { WebsphereManagementConsole } from "../common";
import { getResourceTypeName, resourceTypeIcon } from "../../utils/resourceTypes";
import { setSearchString, submitSearch } from "../../actionCreators/common";
import PrettyXml from "../common/PrettyXml";

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const { dispatch, match, location } = this.props
        if (match.params.query) {
            dispatch(setSearchString(match.params.query))
            dispatch(submitSearch(match.params.query, new URLSearchParams(location.search).get('type')))
        }
    }

    componentDidUpdate(prevProps) {
        const { dispatch, match } = this.props

        if (match.params.query && prevProps.match.params.query != match.params.query) {
            dispatch(submitSearch(match.params.query))
        }
    }

    // eget card element
    cellContents(key, value) {
        const { match } = this.props

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

    additionalCardInfo(searchResult) {
        return (<CardInfo lastUpdated={searchResult.lastchange} lifecycle={searchResult.lifecycle} />)
    }

    searchResultCard(searchResult, idx) {
        let title = searchResult.name
        let avatar = icons[searchResult.type]
        let subtitle = capitalize(searchResult.type)

        const detailedInfo = searchResult.detailedinfo
        const hasDetailedInfo = Object.keys(detailedInfo).length > 0

        switch (searchResult.type) {
            case RESOURCE:
                title = `${getResourceTypeName(detailedInfo.type)} ${searchResult.name}`
                subtitle = `${subtitle} ${searchResult.detailedinfo.scope}`
                avatar = resourceTypeIcon(detailedInfo.type)
                break
            case CLUSTER:
                subtitle = searchResult.info
                break
            case INSTANCE:
            case APPCONFIG:
                subtitle = capitalize(searchResult.detailedinfo.environment)
                break
        }

        return (
            <div style={styles.paddingTop5} key={idx}>
                <Card>
                    <CardHeader title={<Link to={destinationUrl(searchResult)}>{title}</Link>}
                        subheader={subtitle}
                        style={{ paddingTop: '7px', paddingBottom: '7px' }}
                        avatar={avatar}
                        children={this.additionalCardInfo(searchResult)} />

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
                                                    {this.cellContents(di, detailedInfo[di])}
                                                </TableCell>
                                            </TableRow>)
                                    })}
                            </TableBody>
                        </Table>
                    </CardContent>}
                    {searchResult.type === RESOURCE
                        && searchResult.detailedinfo.type.toLowerCase() === 'deploymentmanager'
                        && <CardActions style={{ paddingTop: '0px' }}>
                            <WebsphereManagementConsole hostname={searchResult.detailedinfo.hostname} />)
                    </CardActions>}
                </Card>
            </div>)
    }

    filterByType(type) {
        const { searchQuery, dispatch } = this.props
        dispatch(submitSearch(searchQuery, type))
        const newPath = type ? `/search/${searchQuery}?type=${type}` : `/search/${searchQuery}`
        history.push(newPath)
    }

    resultTypeFilters() {
        const { searchResults } = this.props
        const filter = searchResults.filter
        const resultTypes = toUniqeSortedArray(searchResults.data.map(result => result.type));

        return (
            <Toolbar>
                <Box display="flex" alignItems="center">
                    <Typography variant="subtitle1">Filter</Typography>
                    {SEARCH_RESULT_TYPES.map((type) => {
                        return (
                            <FilterButton
                                key={type}
                                disabled={!resultTypes.includes(type)}
                                activeFilter={filter}
                                type={type}
                                onClickHandler={() => this.filterByType(type)} />)
                    })}

                </Box>
                <Box display="flex" alignItems="center">
                    <Divider orientation="vertical" flexItem style={{margin: "0 8px"}} />
                    <Button variant="contained" disabled={!searchResults.filter} disableRipple
                        style={{backgroundColor: colors.toolbarBackground, color: colors.white, ...styles.raisedButton}}
                        onClick={() => this.filterByType()}>
                        clear
                    </Button>
                </Box>
            </Toolbar>)
    }

    render() {
        return (<div className="main-content-container">
            {this.resultTypeFilters()}
            <div className="row">
                <div className="col-sm-12">
                    {this.props.searchResults.data.map((sr, idx) => this.searchResultCard(sr, idx))}
                </div>
            </div>
        </div>)
    }
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