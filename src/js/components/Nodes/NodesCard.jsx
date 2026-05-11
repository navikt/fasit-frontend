import React from "react";
import {CardInfo} from "../common/index";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {withRouter} from "../../utils/withRouter"
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import {Card, Collapse, CardContent, CardHeader, List, ListItem, ListItemText} from "@mui/material";
import {icons, styles} from "../../commonStyles/commonInlineStyles";
import {capitalize} from "../../utils/stringUtils";

function NodeCard(props) {
    const node = props.node
    const avatar = icons.node
    const environment = node.environment
    const cluster = node.cluster
    const [checked, setChecked] = React.useState(false);

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
                <CardHeader title={<Link to={`/nodes/${node.hostname}`}>{node.hostname}</Link>}
                            subheader={`${node.environment} ${capitalize(node.type)}`}
                            avatar={avatar}
                            style={{ flex: 1 }}
                />
                <CardInfo lastUpdated={node.updated} lifecycle={node.lifecycle}/>
                </div>
                <Collapse in={checked} timeout="auto">
                    <CardContent>
                        <List >
                            <ListSubheader>Applications</ListSubheader>
                            <Divider/>
                            {node.applications
                                .map(application => <ListItem key={application}
                                                              onClick={() => props.history.push(`/applications/${application}`)}>
                                                        <ListItemText primary={application} />
                                                    </ListItem>
                                )}
                        </List>
                    </CardContent>
                    <Button
                        variant="text"
                        disableRipple
                        onClick={() => props.history.push(`/nodes/${node.hostname}`)}
                        style={styles.flatButton}>
                        manage
                    </Button>
                    {cluster && <Button
                        variant="text"
                        disableRipple
                        onClick={() => props.history.push(`/environments/${environment}/clusters/${cluster.name}`)}
                        style={styles.flatButton}>
                        cluster
                    </Button>}
                </Collapse>
            </Card>
        </div>
    )
}

export default withRouter(NodeCard)