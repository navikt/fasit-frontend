import React from "react";
import { Route, Switch } from "react-router-dom";

// Routes
import App from "./components/Root/App";
import Search from "./components/Search/Search";
import Home from "./components/Home";
import Applications from "./components/Applications/Applications";
import Nodes from "./components/Nodes/Nodes";
import Environments from "./components/Environments/Environments";
import EnvironmentCluster from "./components/Environments/EnvironmentCluster";
import Resources from "./components/Resources/Resources";
import Instances from "./components/Instances/Instances";
import NotFound from "./components/NotFound";

export default () => {
  return (
    <App>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search/:query?" component={Search} />
        <Route path="/environments/:environment/clusters/:clusterName" component={EnvironmentCluster} />
        <Route path="/environments/:environment/clusters" component={Environments} />
        <Route path="/environments/:environment/nodes" component={Environments} />
        <Route path="/environments/:environment/instances" component={Environments} />
        <Route path="/environments/:environment?" component={Environments} />
        <Route path="/nodes/:node?" component={Nodes} />
        <Route path="/applications/:application?" component={Applications} />
        <Route path="/resources/:resource?" component={Resources} />
        <Route path="/instances/:instance?" component={Instances} />
        <Route component={NotFound} />
      </Switch>
    </App>
  );
};
