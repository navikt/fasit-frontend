import React, {Component} from "react";
import {connect} from "react-redux";
import {validAuthorization} from "../../utils/";
import {fetchFasitData, fetchNodePassword, clearNodePassword} from "../../actionCreators/node";
import {Card, CardActions, CardHeader, CardText} from "material-ui/Card";
import {List, ListItem} from "material-ui/List"
import {Link} from "react-router";

import {
    AccessControl,
    CurrentRevision,
    CollapsibleList,
    Lifecycle,
    RescueElementForm,
    Security,
    History,
    ToolButtons,
    DeleteElementForm,
SecretToggle
} from "../common/";
import {submitForm} from "../../actionCreators/common";
import NodeEventsView from "./NodeEventsView";
import NodeGraph from "./NodeGraph";
import NodeSeraView from "./NodeSeraView";
import {icons, styles} from "../../commonStyles/commonInlineStyles";
import {capitalize} from "../../utils"

class Node extends Component {
    constructor(props) {
        super(props)

        this.state = {
            secretVisible: false,
            displayDeleteForm: false,
            displayRescueForm: false,
            displayAccessControlForm: false,
            adgroups: [],
            comment: ""
        }
    }

    componentDidMount() {
        const {dispatch, hostname, query} = this.props
        dispatch(fetchFasitData(hostname, query.revision))
    }

    componentWillUnmount() {
        this.props.dispatch(clearNodePassword())
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, hostname, query} = this.props
        this.setState({
            comment: ""
        })
        if (Object.keys(nextProps.node).length > 0) {
            this.setState({adgroups: nextProps.node.accesscontrol.adgroups})
        }

        if (nextProps.query.revision != query.revision) {
            dispatch(fetchFasitData(hostname, nextProps.query.revision))
        }

        // fetch new data from backend if hostname changes
        if (nextProps.hostname != hostname) {
            dispatch(fetchFasitData(nextProps.hostname, nextProps.revision))
        }
    }

    deleteNode(hostname) {
        const {dispatch} = this.props
        this.toggleComponentDisplay("displayDeleteForm")
        dispatch(submitForm(hostname, null, null, "deleteNode"))
    }

    handleSubmitForm(key, form, comment, component) {
        const {dispatch} = this.props

          if (component === "deleteNode") {
            this.toggleComponentDisplay("displayDeleteForm")
            this.setState({comment: ""})
        } else if (component === "node" && this.state.displayAccessControlForm) {
            this.toggleComponentDisplay("displayAccessControlForm")
        } else if (component === "node" && this.state.displayRescueForm) {
            this.toggleComponentDisplay("displayRescueForm")
        }
        dispatch(submitForm(key, form, comment, component))
    }

    resetLocalState() {
        this.setState({
            adgroups: [],
            comment: "",
        })
    }
    toggleComponentDisplay(component) {
        const {dispatch} = this.props
        this.setState({[component]: !this.state[component]})
        if (component === "editMode" && this.state.editMode)
            this.resetLocalState()
        if (component === "editMode" && !this.state.editMode)
            dispatch(fetchNodePassword())
    }

    handleChange(field, value) {
        this.setState({[field]: value})
    }

    toggleDisplaySecret() {
        this.setState({secretVisible: !this.state.secretVisible})
    }

    render() {
        const {hostname, config, user, node, query} = this.props
        const {secretVisible, adgroups, comment} = this.state
        const cluster = node.cluster  ? <Link to={`/environments/${node.environment}/clusters/${node.cluster.name}`}>{node.cluster.name}</Link> : "Orphan node"
        let lifecycle = (Object.keys(node).length > 0) ? node.lifecycle : {}
        let authorized = (Object.keys(node).length > 0) ? validAuthorization(user, node.accesscontrol) : false

        return (
            <div className="row">
                <div className="col-md-6" style={styles.cardPadding}>
                    <CurrentRevision revisionId={query.revision} revisions={this.props.revisions}/>

                    <Card>
                        <CardHeader
                        avatar={icons.node}
                        title={hostname}
                        titleStyle={styles.bold}
                        subtitle={capitalize(node.type)}
                        />
                        <CardText>
                            <List>
                                <ListItem
                                    key="environmentclass"
                                    style={{paddingTop: '0px', paddingBottom: '14px'}}
                                    disabled={true}
                                    primaryText={node.environmentclass}
                                    secondaryText="Environment class"/>
                                <ListItem
                                    key="environment"
                                    style={{paddingTop: '0px', paddingBottom: '14px'}}
                                    disabled={true}
                                    primaryText={node.environment}
                                    secondaryText="Environment"/>
                                <ListItem
                                    key="cluster"
                                    style={{paddingTop: '0px', paddingBottom: '14px'}}
                                    disabled={true}
                                    primaryText={cluster}
                                    secondaryText="Cluster"/>
                                <ListItem
                                key="username"
                                style={{paddingTop: '0px', paddingBottom: '14px'}}
                                disabled={true}
                                primaryText={node.username}
                                secondaryText="Username"/>
                                <ListItem
                                    key="password"
                                    style={{paddingTop: '0px', paddingBottom: '14px'}}
                                    disabled={true}
                                    primaryText={
                                        <div>
                                            {secretVisible ? this.props.currentPassword : "*********"}
                                            <SecretToggle
                                                user={user}
                                                accesscontrol={node.accesscontrol}
                                                secretVisible={secretVisible}
                                                toggleHandler={() => this.toggleDisplaySecret()}
                                            />
                                        </div>}
                                    secondaryText="Password"/>
                            </List>
                        </CardText>
                        <CardActions>
                            <ToolButtons
                                disabled={!authorized}
                                onEditClick={() => this.toggleComponentDisplay("editMode")}
                                onDeleteClick={() => this.toggleComponentDisplay("displayDeleteForm")}
                                onCopyClick={() => console.log("Copy,copycopy!")}
                                editMode={this.state.editMode}
                            />
                        </CardActions>
                    </Card>
                    <Lifecycle lifecycle={lifecycle}
                               rescueAction={() => this.toggleComponentDisplay("displayRescueForm")}
                               authorized={authorized}/>

                </div>

                {/*Side menu*/}
                <div className="col-md-4">
                    <History id={hostname} currentRevision={query.revision} component="node"/>
                    <Security accesscontrol={node.accesscontrol}
                              displayAccessControlForm={() => this.toggleComponentDisplay("displayAccessControlForm")}/>
                    <CollapsibleList
                        primaryText="Sensu status"
                        leftAvatar={icons.sensuStatusAvatar}
                        initiallyOpen={false}
                        nestedItems={<NodeEventsView key={hostname}/>}/>
                    <CollapsibleList
                        primaryText="Hardware"
                        leftAvatar={icons.hardwareAvatar}
                        initiallyOpen={false}
                        nestedItems={<NodeSeraView key={hostname} hostname={hostname}/>}/>
                    <CollapsibleList
                        primaryText="Grafana graph"
                        leftAvatar={icons.grafanaAvatar}
                        initiallyOpen={false}
                        nestedItems={<NodeGraph key={hostname} url={config.grafana} hostname={hostname}/>}/>
                </div>

                {/* Misc. modals*/}
                <AccessControl
                    displayAccessControlForm={this.state.displayAccessControlForm}
                    onClose={() => this.toggleComponentDisplay("displayAccessControlForm")}
                    onSubmit={() => this.handleSubmitForm(hostname, {

                        }
                        , comment, "node")}
                    id={hostname}
                    value={adgroups}
                    handleChange={this.handleChange.bind(this)}
                    comment={comment}
                />
                <DeleteElementForm
                    displayDeleteForm={this.state.displayDeleteForm}
                    onClose={() => this.toggleComponentDisplay("displayDeleteForm")}
                    onSubmit={() => this.deleteNode(hostname)}
                    id={hostname}
                />
                <RescueElementForm
                    displayRescueForm={this.state.displayRescueForm}
                    onClose={() => this.toggleComponentDisplay("displayRescueForm")}
                    onSubmit={() => this.handleSubmitForm(hostname, {

                        }
                        , comment, "node")}
                    id={hostname}
                    handleChange={this.handleChange.bind(this)}
                    comment={comment}

                />

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        node: state.node_fasit.data,
        currentPassword: state.node_fasit.currentPassword,
        user: state.user,
        editMode: state.nodes.showEditNodeForm,
        hostname: ownProps.hostname,
        config: state.configuration,
        revisions: state.revisions,
        query: state.routing.locationBeforeTransitions.query
    }
}

export default connect(mapStateToProps)(Node)
