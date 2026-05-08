import React from "react";
import {getResourceTypeName, resourceTypeIcon} from "../../utils/resourceTypes";
import {CardInfo, WebsphereManagementConsole} from "../common/index";
import {List, ListItem, ListItemText, Collapse} from "@mui/material";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {withRouter} from "../../utils/withRouter"
import {Card, CardContent, CardHeader} from "@mui/material";
import {styles} from "../../commonStyles/commonInlineStyles";
import {capitalize} from "../../utils/index";

function ResourceCard(props) {
    const resource = props.resource
    const avatar = resourceTypeIcon(resource.type)
    const title = `${getResourceTypeName(resource.type)} - ${resource.alias}`
    const scope = Object.keys(resource.scope).map(k => `${resource.scope[k]}`).join(' | ')
    const [checked, setChecked] = React.useState(false);

    const properties = Object.keys(resource.properties).map(k => ({
        key: capitalize(k),
        property: resource.properties[k]
    }))

    const primaryText = (key, value) => key === 'ApplicationProperties' ? (<pre><code>{value}</code></pre>) : value

    const handleChange = () => {
        setChecked((prev) => !prev);
    };

    return (
        <div style={styles.cardPadding}>
            <Card raised={true}>
                <div 
                    style={{ display: "flex", alignItems: "center" }}
                    onClick={handleChange}
                >
                <CardHeader title={<Link to={`/resources/${resource.id}`}>{title}</Link>}
                            subheader={scope}
                            avatar={avatar}
                            style={{paddingBottom: '10px', flex: 1}}
                />
                <CardInfo lastUpdated={resource.updated} lifecycle={resource.lifecycle}/>
                </div>
                <Collapse in={checked} timeout="auto">
                    <CardContent style={{paddingTop: '0px', paddingBottom: '0px'}}>
                        <List>
                            {properties.map((p, key) =>
                                <ListItem key={key} style={{paddingTop: '0px', paddingBottom: '14px'}}
                                          className="text-overflow">
                                    <ListItemText
                                        primary={primaryText(p.key, p.property)}
                                        secondary={p.key}
                                    />
                                </ListItem>)}
                        </List>
                    </CardContent>
                    <Button
                        variant="text"
                        disableRipple
                        onClick={() => props.history.push(`/resources/${resource.id}`)}
                        style={styles.flatButton}>
                        manage
                    </Button>
                    {resource.type.toLowerCase() === 'deploymentmanager'
                    && (<WebsphereManagementConsole hostname={resource.properties.hostname}/>)}
                </Collapse>
            </Card>
        </div>
    )
}

export default withRouter(ResourceCard)
