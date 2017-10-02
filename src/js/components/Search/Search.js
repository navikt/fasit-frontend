import React, {Component} from "react";
import {connect} from "react-redux";
import {browserHistory, Link} from "react-router";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from "material-ui/Toolbar";
import RaisedButton from "material-ui/RaisedButton";
import {Table, TableBody, TableRow, TableRowColumn} from "material-ui/Table";
import {
    APPCONFIG,
    APPLICATION,
    CLUSTER,
    destinationUrl,
    SEARCH_RESULT_TYPES,
    ENVIRONMENT,
    INSTANCE,
    NODE,
    RESOURCE
} from "../Search/searchResultTypes";
import {colors, icons, styles} from "../../commonStyles/commonInlineStyles";
import {CardInfo} from "../common/";
import {capitalize} from "../../utils/";
import {WebsphereManagementConsole} from "../common";
import {getResourceTypeName, resourceTypeIcon} from "../../utils/resourceTypes";
import {setSearchString, submitSearch} from "../../actionCreators/common";
import PrettyXml from "../common/PrettyXml";

class Search extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const {dispatch, params, location} = this.props
        if (params.query) {
            dispatch(setSearchString(params.query))
            dispatch(submitSearch(params.query, location.query.type))
        }
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, params} = this.props

        if (nextProps.params.query && params.query != nextProps.params.query) {
            dispatch(submitSearch(nextProps.params.query))
        }
    }

    // eget card element
    cellContents(key, value) {
        const {params} = this.props

        if (Array.isArray(value)) {
            return value.map((v, idx) => (<span key={idx}>{v}<br/></span>))
        }

        switch (key.toLowerCase()) {
            case "appconfig":
                return <PrettyXml xml={value} filter={params.query}/>
            case "applicationproperties":
                return value.split('\n').map((v, idx) => (<span key={idx}>{v}<br/></span>))
            default:
                return value
        }
    }

    additionalCardInfo(searchResult) {
        return (<CardInfo lastUpdated={searchResult.lastchange} lifecycle={searchResult.lifecycle}/>)
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
                subtitle = searchResult.detailedinfo.environment
                break
        }

        return (
            <div style={styles.paddingTop5} key={idx}>
                <Card expandable={hasDetailedInfo} initiallyExpanded={false}>
                    <CardHeader title={<Link to={destinationUrl(searchResult)}>{title}</Link>}
                                subtitle={subtitle}
                                style={{paddingTop: '7px', paddingBottom: '7px'}}
                                avatar={avatar}
                                showExpandableButton={false}
                                actAsExpander={true}
                                children={this.additionalCardInfo(searchResult)}/>

                    {hasDetailedInfo && <CardText expandable={true} actAsExpander={true}>
                        <Table>
                            <TableBody displayRowCheckbox={false}>
                                {Object.keys(detailedInfo)
                                    .filter(di => detailedInfo[di] !== null && detailedInfo[di] !== '')
                                    .sort()
                                    .map((di) => {
                                        return (
                                            <TableRow key={di} selectable={false}>
                                                <TableRowColumn style={styles.tableCellPadding}
                                                                className={"col-sm-2"}>
                                                    {capitalize(di)}
                                                </TableRowColumn>
                                                <TableRowColumn style={styles.tableCellPadding}
                                                                className="text-overflow">
                                                    {this.cellContents(di, detailedInfo[di])}
                                                </TableRowColumn>
                                            </TableRow>)
                                    })}
                            </TableBody>
                        </Table>
                    </CardText>}
                    {searchResult.type === RESOURCE
                    && searchResult.detailedinfo.type.toLowerCase() === 'deploymentmanager'
                    && <CardActions actAsExpander={true} style={{paddingTop: '0px'}}>
                        <WebsphereManagementConsole hostname={searchResult.detailedinfo.hostname}/>)
                    </CardActions>}
                </Card>
            </div>)
    }

    filterByType(type) {
        const {searchQuery, dispatch} = this.props
        dispatch(submitSearch(searchQuery, type))
        const newPath = type ? `/search/${searchQuery}?type=${type}` : `/search/${searchQuery}`
        browserHistory.push(newPath)
    }

    resultTypeFilters() {
        const {searchResults} = this.props
        const filter = searchResults.filter

        const resultTypes = toUniqeSortedArray(searchResults.data.map(result => result.type));

        return (<Toolbar>
            <ToolbarGroup>
                <ToolbarTitle text="Filter"/>
                {SEARCH_RESULT_TYPES.map(type => {
                    return (!searchResults.filter && resultTypes.includes(type) ) && <FilterButton
                        key={type}
                        activeFilter={filter}
                        type={type}
                        onCLickHandler={() => this.filterByType(type)}/>
                })}
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarSeparator/>
                <RaisedButton label='clear' disabled={!searchResults.filter} disableTouchRipple={true}
                              backgroundColor={colors.toolbarBackground} labelColor={colors.white}
                              style={styles.raisedButton}
                              onTouchTap={() => this.filterByType()}/>
            </ToolbarGroup>
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
    const {type, onClickHandler, activeFilter} = props
    return (<RaisedButton
        key={type}
        label={type}
        disableTouchRipple={true}
        backgroundColor={activeFilter === type ? colors.toolbarBackground : colors.white}
        labelColor={activeFilter === type ? colors.white : colors.black}
        onTouchTap={onClickHandler}/>)
}

export default connect(mapStateToProps)(Search)