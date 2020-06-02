import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Card, CardItem } from "../common/Card";
import { styles } from "../../commonStyles/commonInlineStyles";
import Manifest from "./Manifest";
import { CurrentRevision, RevisionsView } from "../common/";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { fetchInstance } from "../../actionCreators/instance";
import Spinner from "../common/Spinner";
import { getQueryParam, isEmptyObject } from "../../utils/";
import CollapsibleResourcePanel from "./CollapsibleResourcePanel";

class Instance extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch, location, match } = this.props;
    const revision = getQueryParam(location.search, "revision");
    dispatch(fetchInstance(match.params.instance, revision));
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { dispatch, id, location, match } = this.props;
    const instanceId = match.params.instance;
    const revision = getQueryParam(location.search, "revision");
    const nextPropsInstanceId = nextProps.match.params.instance;
    const nextPropsRevision = getQueryParam(
      nextProps.location.search,
      "revision"
    );

    // Fetch data from backend if revision changes
    if (nextPropsRevision != revision) {
      dispatch(fetchInstance(instanceId, nextPropsRevision));
    }
    // Fetch data from backend if id changes
    if (nextProps.id != id) {
      dispatch(fetchInstance(nextPropsInstanceId, nextPropsRevision));
    }
  }

  render() {
    const {
      instance,
      revisions,
      query,
      id,
      isFetching,
      location,
      match,
    } = this.props;
    const instanceId = match.params.instance;
    const clusterName = instance.cluster ? instance.cluster.name : "";
    const revision = getQueryParam(location.search, "revision");

    return isEmptyObject(instance) || isFetching ? (
      <Spinner />
    ) : (
      <div>
        <div className="row">
          <CurrentRevision revisionId={revision} revisions={revisions} />
          <div className="col-md-8" style={styles.cardPadding}>
            <Card
              title={instance.application}
              linkTo={`/applications/${instance.application}`}
              subtitle={`${instance.application}:${instance.version}`}
            >
              <CardItem
                label="Environment"
                value={instance.environment}
                linkTo={`/environments/${instance.environment}`}
              />
              <CardItem
                label="Cluster"
                value={`/environments/${instance.environment}/clusters/${clusterName}`}
                linkTo={clusterName}
              ></CardItem>
              <div style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="selftests"
                  >
                    <b>Selftest urls</b>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ul style={{ listStyleType: "none" }}>
                      {instance.selftesturls.map((selftest, idx) => (
                        <li key={idx}>
                          <Link to={selftest}>{selftest}</Link>
                        </li>
                      ))}
                    </ul>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
                <CollapsibleResourcePanel
                  title={`Used resources (${instance.usedresources.length})`}
                  resourceList={instance.usedresources}
                />
                <CollapsibleResourcePanel
                  title={`Exposed resources (${instance.exposedresources.length})`}
                  resourceList={instance.exposedresources}
                />

                <ExpansionPanel>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    id="appconfig"
                  >
                    <b>App-config</b>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Manifest />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            </Card>
          </div>
          <RevisionsView
            id={id}
            currentRevision={revision}
            component="instance"
            location={location}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    instance: state.instance_fasit.data,
    isFetching: state.instance_fasit.isFetching,
    user: state.user,
    config: state.configuration,
    revisions: state.revisions,
  };
};

function SelfTestLinks(props) {
  return (
    <ul key="1" className="revisionList">
      {props.links.sort().map((link) => (
        <li key={link}>
          <a href={link} className="revisionListItem" target="_blank">
            {link.split("/")[2]}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default connect(mapStateToProps)(Instance);
