import React, { useState } from "react";
import {CardInfo} from "../common/index";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {withRouter} from "../../utils/withRouter"
import {Card, Collapse, CardContent, CardHeader, Tabs, Tab} from "@mui/material";
import SortableResourceTable from "../Resources/SortableResourcesTable";
import {icons, styles} from "../../commonStyles/commonInlineStyles";

function InstanceCard(props) {


    const [selectedTab, setSelectedTab] = useState(0)
    const [checked, setChecked] = useState(false)

    const instance = props.instance
    const avatar = icons.instance
    const id = instance.id
    const environment = instance.environment
    const usedResources = instance.usedresources
    const exposedResources = instance.exposedresources

    const cluster = instance.cluster

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
                <CardHeader title={<Link to={`/instances/` + id}>{`${instance.application}:${instance.version ? instance.version : 'Not deployed'}`}</Link>}
                            subheader={environment}
                            avatar={avatar}
                            style={{ flex: 1 }}
                />
                <CardInfo lastUpdated={instance.updated} lifecycle={instance.lifecycle}/>
                </div>
                <Collapse in={checked} timeout="auto">
                    <CardContent>
                        <Tabs 
                            value={selectedTab}
                            onChange={(e, val) => setSelectedTab(val)}
                            style={styles.tabItem}
                            variant="fullWidth"
                            role="navigation"
                            sx={{
                                '.MuiTab-root': { color: 'rgba(255, 255, 255, 0.5)' },
                                '.MuiTab-root.Mui-selected': { color: '#ffffff' },
                                '.MuiTab-root.Mui-disabled': { color: 'rgba(255, 255, 255, 0.3)' }
                            }}>
                            <Tab label={`Used resources ${usedResources.length}`} disableRipple/>
                            <Tab label={`Exposed resources ${exposedResources.length}`} disableRipple
                                 disabled={exposedResources.length === 0}/>
                        </Tabs>
                        {selectedTab === 0 && <SortableResourceTable resources={usedResources}/>}
                        {selectedTab === 1 && <SortableResourceTable resources={exposedResources}/>}
                    </CardContent>
                    <Button
                        variant="text"
                        disableRipple
                        onClick={() => props.history.push('/instances/' + id)}
                        style={styles.flatButton}>
                        details
                    </Button>
                    {cluster.name && <Button
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

export default withRouter(InstanceCard)
