import React from "react";
import { CardInfo } from "../common/";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withRouter } from "../../utils/withRouter"
import { Card, Collapse, CardContent, CardHeader } from "@material-ui/core";
import { icons, styles } from "../../commonStyles/commonInlineStyles";


export function ApplicationCard(props) {
    const application = props.application
    const avatar = icons.application
    const [checked, setChecked] = React.useState(false);
    //const additionalCardInfo = (<CardInfo lastUpdated={application.updated} lifecycle={application.lifecycle}/>)

    const handleChange = () => {
        setChecked((prev) => !prev);
    };


    return (
        <div style={styles.cardPadding}>
            <Card onClick={handleChange} raised={true}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <CardHeader
                        title={<Link to={`/applications/${application.name}`}>{application.name}</Link>}
                        avatar={avatar}
                        style={{ flex: 1 }}
                    />
                <CardInfo lastUpdated={application.updated} lifecycle={application.lifecycle}/>
                </div>
                <Collapse in={checked} timeout="auto" >
                <CardContent>
                    <div>
                        {`Group id ${application.groupid}`}<br/>
                        {`Artifact id ${application.artifactid}`}<br/>
                        {`Port offset ${application.portoffset}`}
                    </div>
                </CardContent>
                    <Button
                        variant="text"
                        disableRipple
                        onClick={() => props.history.push('/applications/' + application.name)}
                        style={styles.flatButton}>
                        manage
                    </Button>
                </Collapse>
            </Card>
        </div>
    )
}

export default withRouter(ApplicationCard)