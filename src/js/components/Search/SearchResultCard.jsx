import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent, CardHeader, Collapse, Table, TableBody, TableRow, TableCell } from "@mui/material";
import { APPCONFIG, CLUSTER, destinationUrl, INSTANCE, RESOURCE } from "./searchResultTypes";
import { icons, styles } from "../../commonStyles/commonInlineStyles";
import { CardInfo } from "../common/index";
import { capitalize } from "../../utils/stringUtils";
import { WebsphereManagementConsole } from "../common";
import { getResourceTypeName, resourceTypeIcon } from "../../utils/resourceTypes";
import PrettyXml from "../common/PrettyXml";

function SearchResultCard(props) {
    const [expanded, setExpanded] = useState(false);
    const searchResult = props.searchResult
    const searchQuery = props.searchQuery

    const detailedInfo = searchResult.detailedinfo || searchResult.detailedInfo || {}
    const hasDetailedInfo = Object.keys(detailedInfo).length > 0
    const lastChange = searchResult.lastchange || searchResult.lastChange

    let title = searchResult.name
    let avatar = icons[searchResult.type]
    let subtitle = capitalize(searchResult.type)

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

    const cellContents = (key, value) => {
        if (Array.isArray(value)) {
            return value.map((v, idx) => (<span key={idx}>{v}<br /></span>))
        }

        switch (key.toLowerCase()) {
            case "appconfig":
                return <PrettyXml xml={value} filter={searchQuery} />
            case "applicationproperties":
                return value.split('\n').map((v, idx) => (<span key={idx}>{v}<br /></span>))
            default:
                return value
        }
    }

    return (
        <div style={styles.cardPadding}>
            <Card raised={true}>
                <div
                    style={{ display: "flex", alignItems: "center", cursor: hasDetailedInfo ? "pointer" : "default" }}
                    onClick={() => hasDetailedInfo && setExpanded(prev => !prev)}
                >
                    <CardHeader
                        title={<Link to={destinationUrl(searchResult)}>{title}</Link>}
                        subheader={subtitle}
                        style={{ paddingTop: '10px', paddingBottom: '10px', flex: 1 }}
                        avatar={avatar}
                    />
                    <CardInfo lastUpdated={lastChange} lifecycle={searchResult.lifecycle} />
                </div>

                <Collapse in={expanded} timeout="auto">
                    {hasDetailedInfo && <CardContent>
                        <Table>
                            <TableBody>
                                {Object.keys(detailedInfo)
                                    .filter(di => detailedInfo[di] !== null && detailedInfo[di] !== '')
                                    .sort()
                                    .map((di) => (
                                        <TableRow key={di}>
                                            <TableCell style={styles.tableCellPadding}
                                                className={"col-sm-2"}>
                                                {capitalize(di)}
                                            </TableCell>
                                            <TableCell style={styles.tableCellPadding}
                                                className="text-overflow">
                                                {cellContents(di, detailedInfo[di])}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </CardContent>}
                    {searchResult.type === RESOURCE
                        && detailedInfo.type && detailedInfo.type.toLowerCase() === 'deploymentmanager'
                        && <CardActions style={{ paddingTop: '0px' }}>
                            <WebsphereManagementConsole hostname={detailedInfo.hostname} />
                        </CardActions>}
                </Collapse>
            </Card>
        </div>
    )
}

export default SearchResultCard
