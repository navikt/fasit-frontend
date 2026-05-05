import React from "react";
import { Route, Routes } from "react-router-dom";

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
import { WithParams } from "./utils/withRouter";

export default () => {
  return (
    <App>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<WithParams><Search /></WithParams>} />
        <Route path="/search" element={<WithParams><Search /></WithParams>} />
        <Route path="/environments/:environment/clusters/:clusterName" element={<WithParams><EnvironmentCluster /></WithParams>} />
        <Route path="/environments/:environment/clusters" element={<WithParams><Environments /></WithParams>} />
        <Route path="/environments/:environment/nodes" element={<WithParams><Environments /></WithParams>} />
        <Route path="/environments/:environment/instances" element={<WithParams><Environments /></WithParams>} />
        <Route path="/environments/:environment" element={<WithParams><Environments /></WithParams>} />
        <Route path="/environments" element={<WithParams><Environments /></WithParams>} />
        <Route path="/nodes/:node" element={<WithParams><Nodes /></WithParams>} />
        <Route path="/nodes" element={<WithParams><Nodes /></WithParams>} />
        <Route path="/applications/:application" element={<WithParams><Applications /></WithParams>} />
        <Route path="/applications" element={<WithParams><Applications /></WithParams>} />
        <Route path="/resources/:resource" element={<WithParams><Resources /></WithParams>} />
        <Route path="/resources" element={<WithParams><Resources /></WithParams>} />
        <Route path="/instances/:instance" element={<WithParams><Instances /></WithParams>} />
        <Route path="/instances" element={<WithParams><Instances /></WithParams>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </App>
  );
};
