import React from "react";
import { CardInfo } from "../common/";
import { Link } from "react-router";
import { Card, CardHeader } from "material-ui/Card";
import { icons, styles } from "../../commonStyles/commonInlineStyles";

export default function EnvironmentCard(props) {
    const environment = props.environment
    const avatar = icons.environment
    const additionalCardInfo = (<CardInfo lastUpdated={environment.updated} lifecycle={environment.lifecycle} />)

    return (
        <div style={styles.cardPadding}>
            <Card>
                <CardHeader title={<Link to={`/environments/${environment.name}`}>{environment.name}</Link>}
                    subtitle={`Environmentclass: ${environment.environmentclass}`}
                    avatar={avatar}
                    children={additionalCardInfo}
                />
            </Card>
        </div>
    )
}