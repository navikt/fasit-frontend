import React, {Component} from 'react'
import {connect} from 'react-redux'
import {browserHistory} from "react-router";
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card'
import {Toolbar, ToolbarGroup, ToolbarTitle, ToolbarSeparator} from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import {APPCONFIG, APPLICATION, CLUSTER, ENVIRONMENT, INSTANCE, NODE, RESOURCE, destinationUrl} from '../Search/searchResultTypes'
import {styles, colors, icons}  from '../../commonStyles/commonInlineStyles'
import {LifecycleStatus} from "../common/";
import {capitalize} from '../../utils/'
import {WebsphereManagementConsole} from '../common'
import {getResourceTypeName, resourceTypeIcon} from '../../utils/resourceTypes'
import {submitSearch, setSearchString} from '../../actionCreators/common'
import PrettyXml from '../common/PrettyXml'
import moment from 'moment'

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
        return (<div className="pull-right">
            <div className="text-muted">Changed {moment(searchResult.lastchange).fromNow()}</div>
            <br/>
            <LifecycleStatus status={searchResult.lifecycle.status}/>
        </div>)
    }

    searchResultCard(searchResult, idx) {
        let title
        let avatar
        let subtitle = capitalize(searchResult.type)

        const detailedInfo = searchResult.detailedinfo
        const hasDetailedInfo = Object.keys(detailedInfo).length > 0

        if (searchResult.type === RESOURCE) {
            title = `${getResourceTypeName(detailedInfo.type)} ${searchResult.name}`
            subtitle = `${subtitle} ${searchResult.detailedinfo.scope}`
            avatar = resourceTypeIcon(detailedInfo.type)
        } else {
            title = searchResult.name
            avatar = icons[searchResult.type]
        }

        return (
            <div style={styles.paddingTop5} key={idx}>
                <Card expandable={hasDetailedInfo} initiallyExpanded={false}>
                    <CardHeader title={title}
                                titleStyle={styles.bold}
                                subtitle={subtitle}
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
                                            <TableRow key={di}>
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
                    <CardActions actAsExpander={true}>
                        <FlatButton
                            disableTouchRipple={true}
                            label="View"
                            style={styles.flatButton}
                            onTouchTap={() => this.navigate(searchResult)}
                        />
                        {searchResult.type === RESOURCE
                        && searchResult.detailedinfo.type.toLowerCase() === 'deploymentmanager'
                        && ( <WebsphereManagementConsole hostname={searchResult.detailedinfo.hostname}/>)}
                    </CardActions>
                </Card>
            </div>)
    }

    navigate(searchResult) {
        browserHistory.push(destinationUrl(searchResult))
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
        return  <Toolbar>
                <ToolbarGroup>
                    <ToolbarTitle text="Filter"/>
                    <FilterButton activeFilter={filter} type={APPCONFIG}
                                  onClickHandler={() => this.filterByType(APPCONFIG)}/>
                    <FilterButton activeFilter={filter} type={APPLICATION}
                                  onClickHandler={() => this.filterByType(APPLICATION)}/>
                    <FilterButton activeFilter={filter} type={ENVIRONMENT}
                                  onClickHandler={() => this.filterByType(ENVIRONMENT)}/>
                    <FilterButton activeFilter={filter} type={CLUSTER}
                                  onClickHandler={() => this.filterByType(CLUSTER)}/>
                    <FilterButton activeFilter={filter} type={INSTANCE}
                                  onClickHandler={() => this.filterByType(INSTANCE)}/>
                    <FilterButton activeFilter={filter} type={NODE} onClickHandler={() => this.filterByType(NODE)}/>
                    <FilterButton activeFilter={filter} type={RESOURCE}
                                  onClickHandler={() => this.filterByType(RESOURCE)}/>
                </ToolbarGroup>
                <ToolbarGroup>
                    <ToolbarSeparator/>
                    <RaisedButton label='clear' disabled={!searchResults.filter} disableTouchRipple={true} backgroundColor={colors.toolbarBackground} labelColor={colors.white} style={styles.raisedButton}
                                  onTouchTap={() => this.filterByType()}/>
                </ToolbarGroup>
            </Toolbar>
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