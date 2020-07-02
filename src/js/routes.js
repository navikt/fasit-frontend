import React from "react";
import { Route, Switch } from "react-router-dom";

// Routes
import Search from "./components/Search/Search";
import Applications from "./components/Applications/Applications";
import Application from "./components/Applications/Application";
import Nodes from "./components/Nodes/Nodes";
import Node from "./components/Nodes/Node";
import Environments from "./components/Environments/Environments";
import Environment from "./components/Environments/Environment";
import EnvironmentCluster from "./components/Environments/EnvironmentCluster";
import Resources from "./components/Resources/Resources";
//import Resource from "./components/Resources/Resource"
import Instances from "./components/Instances/Instances";
import Instance from "./components/Instances/Instance";
import NotFound from "./components/NotFound";

export const Routes = () => {
  return (
    <Switch>
      {<Route exact path="/" component={Search} />}
      {<Route path="/search/:query?" component={Search} />}
      {<Route exact path="/nodes/" component={Nodes} />}
      {<Route exact path="/nodes/:node?" component={Node} />}
      <Route
        path="/environments/:environment/clusters/:clusterName?"
        component={EnvironmentCluster}
      />
      <Route exact path="/environments/" component={Environments} />
      <Route path="/environments/:environment?" component={Environment} />
      <Route exact path="/applications/" component={Applications} />
      <Route path="/applications/:application?" component={Application} />
      <Route exact path="/resources/" component={Resources} />
      {/*<Route path="/resources/:resource" component={Resource} />*/}
      <Route exact path="/instances/" component={Instances} />
      <Route path="/instances/:instance?" component={Instance} />
      <Route path="*" component={NotFound} />
    </Switch>
  );
};
