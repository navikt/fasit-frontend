import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Card, CardHeader, CardActions, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import Avatar from 'material-ui/Avatar'
import {Table, TableBody, TableRow, TableRowColumn} from 'material-ui/Table'
import {styles, colors, icons}  from '../../commonStyles/commonInlineStyles'
import {capitalize} from '../../utils/'
import {getResourceTypeName, resourceTypeIcon} from '../../utils/resourceTypes'
import {submitSearch} from '../../actionCreators/common'
import PrettyXml from '../common/PrettyXml'
import moment from 'moment'

const RESOURCE = "resource"

class Search extends Component {


    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        const {dispatch, params} = this.props
        if (params.query)
            dispatch(submitSearch(params.query))
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, params} = this.props

        if (nextProps.params.query && params.query != nextProps.params.query) {
            dispatch(submitSearch(nextProps.query))
        }
    }

    // eget card element
    // filter i search på type

    cellContents(key, value) {
        const {params} =  this.props

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
        </div>)
    }

    searchResultCard(searchResult, idx) {
        let title
        let avatar

        const detailedInfo = searchResult.detailedinfo
        const hasDetailedInfo = Object.keys(detailedInfo).length > 0

        if (searchResult.type === RESOURCE) {
            title = `${getResourceTypeName(detailedInfo.type)} ${searchResult.name}`
            avatar = resourceTypeIcon(detailedInfo.type)
        } else {
            title = searchResult.name
            let icon = icons[searchResult.type] || searchResult.type.substr(0, 1).toUpperCase()
            avatar = (<Avatar
                backgroundColor={colors.avatarBackgroundColor}
                color={colors.white}>
                {icon}
            </Avatar>)
        }

        return (
            <div style={styles.paddingTop5} key={idx}>
                <Card expandable={hasDetailedInfo} initiallyExpanded={false}>
                    <CardHeader title={title}
                                titleStyle={styles.bold}
                                subtitle={capitalize(searchResult.type)}
                                avatar={avatar}
                                showExpandableButton={false}
                                actAsExpander={true}
                                children={this.additionalCardInfo(searchResult)}/>

                    {hasDetailedInfo ? (
                        <CardText expandable={true} actAsExpander={true}>
                            <Table>
                                <TableBody displayRowCheckbox={false}>
                                    {Object.keys(detailedInfo)
                                        .filter(di => detailedInfo[di] !== null &&  detailedInfo[di] !== '')
                                        .sort()
                                        .map((di) => {
                                            return (
                                                <TableRow key={di}>
                                                    <TableRowColumn style={styles.tableCellPadding} className={"col-sm-2"}>
                                                        {capitalize(di)}
                                                    </TableRowColumn>
                                                    <TableRowColumn style={styles.tableCellPadding} className="text-overflow">
                                                        {this.cellContents(di, detailedInfo[di])}
                                                    </TableRowColumn>
                                                </TableRow>)
                                        })}

                                </TableBody>
                            </Table>
                        </CardText>) : null}

                    <CardActions actAsExpander={true}>
                        <FlatButton
                            disableTouchRipple={true}
                            label="View"
                            primary={true}
                            labelStyle={styles.bold}
                        />
                    </CardActions>
                </Card>
            </div>)
    }

    render() {
        return (<div className="main-content-container">
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
        searchResults: state.search
    }
}

export default connect(mapStateToProps)(Search)