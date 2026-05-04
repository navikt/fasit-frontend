import React from "react";
import { CardInfo } from "../common/";
import { Link } from "react-router-dom";
import { Card, CardHeader } from "@material-ui/core";
import { icons, styles } from "../../commonStyles/commonInlineStyles";

export default function EnvironmentCard(props) {
    const environment = props.environment
    const avatar = icons.environment

    return (
        <div style={styles.cardPadding}>
            <Card raised={true} >
                <div 
                    style={{ display: "flex", alignItems: "center" }}>
                <CardHeader title={<Link to={`/environments/${environment.name}`}>{environment.name}</Link>}
                    subheader={`Environmentclass: ${environment.environmentclass}`}
                    avatar={avatar}
                    style={{ flex: 1 }}
                />
                <CardInfo lastUpdated={environment.updated} lifecycle={environment.lifecycle} />
                </div>
            </Card>
        </div>
    )
}