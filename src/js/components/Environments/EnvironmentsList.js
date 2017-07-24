import React from "react";
import {LifecycleStatus} from "../common/";
import FlatButton from "material-ui/FlatButton";
import {browserHistory} from "react-router";
import {Card, CardActions, CardHeader} from "material-ui/Card";
import {icons, styles} from "../../commonStyles/commonInlineStyles";
import moment from "moment";

export function EnvironmentsList(props) {
    const environments = props.environments.data
    return (
        <div>{
            environments.map((item, index)=> {
                return <EnvironmentCard environment={item} key={index}/>
            })
        }   </div>
    )
}

function navigateToEnvironment(name) {
    browserHistory.push('/environments/' + name)
}

function EnvironmentCard(props) {
    moment.locale("en")
    const environment =  props.environment
    const avatar = icons.environment
    const additionalCardInfo = (<div className="pull-right">
        <div className="text-muted">Changed {moment(environment.updated).fromNow()}</div>
        <br/>
        <LifecycleStatus status={environment.lifecycle.status}/>
    </div>)

    return (
        <div style={styles.cardPadding} >
            <Card>
                <CardHeader title={environment.name}
                            titleStyle={styles.bold}
                            subtitle={`Environmentclass: ${environment.environmentclass}`}
                            avatar={avatar}
                            children={additionalCardInfo}
                            onClick={() => navigateToEnvironment(environment.name)}
                />
                <CardActions>
                    <FlatButton
                        disableTouchRipple={true}
                        onTouchTap={() => navigateToEnvironment(environment.name)}
                        label="manage"
                        style={styles.flatButton}/>
                </CardActions>
            </Card>
        </div>
    )
}