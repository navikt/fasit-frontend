import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import sinon from "sinon";
import { Environment } from "../../../../src/js/components/Environments/Environment";
import { Card } from "material-ui/Card";
import {
  CurrentRevision,
  Lifecycle,
  ToolButtons,
} from "../../../../src/js/components/common/";

describe("(Component) Environment", () => {
  it('renders "Environment" without exploding', () => {
    const wrapper = shallow(<Environment {...props} />);
    expect(wrapper).to.have.length(1);
  });

  it("sets initial state", () => {
    const wrapper = shallow(<Environment {...props} />);
    expect(wrapper.state().displayClusters).to.equal(true);
    expect(wrapper.state().displayNodes).to.equal(false);
    expect(wrapper.state().displayInstances).to.equal(false);
    expect(wrapper.state().displaySubmitForm).to.equal(false);
    expect(wrapper.state().displayDeleteForm).to.equal(false);
    expect(wrapper.state().editMode).to.equal(false);
    expect(wrapper.state().comment).to.equal("");
  });

  it('(function) "resetLocalState" resets state', () => {
    const wrapper = shallow(<Environment {...props} />);
    wrapper.setState({ comment: "mikke mus was here" });
    wrapper.instance().resetLocalState();
    expect(wrapper.state().comment).to.equal("");
  });

  it('(function) "toggleComponentDisplay" toggles component display', () => {
    const wrapper = shallow(<Environment {...props} />);
    wrapper.instance().toggleComponentDisplay("displayNodes");
    expect(wrapper.state().displayNodes).to.equal(true);
  });

  it('(function) "handleChange" sets new state', () => {
    const wrapper = shallow(<Environment {...props} />);
    wrapper.instance().handleChange("a", "b");
    expect(wrapper.state().a).to.equal("b");
  });

  it('(function) "handleSubmitForm" dispatches correct action', () => {
    const dispatch = sinon.spy();
    const wrapper = shallow(<Environment {...props} dispatch={dispatch} />);
    wrapper
      .instance()
      .handleSubmitForm("mikke", "mus", "was here", "environment");
    expect(dispatch.args[0][0].key).to.equal("mikke");
    expect(dispatch.args[0][0].form).to.equal("mus");
    expect(dispatch.args[0][0].comment).to.equal("was here");
    expect(dispatch.args[0][0].component).to.equal("environment");
  });

  it('(function) "componentDidMount" dispatches correct action', () => {
    const dispatch = sinon.spy();
    const wrapper = shallow(<Environment {...props} dispatch={dispatch} />);
    wrapper.instance().componentDidMount();
    expect(dispatch.args[0][0].type).to.equal("ENVIRONMENT_FASIT_REQUEST");
    expect(dispatch.args[0][0].id).to.equal("p");
  });

  it('(function) "componentWillReceiveProps" dispatches correct action', () => {
    const dispatch = sinon.spy();
    const wrapper = shallow(<Environment {...props} dispatch={dispatch} />);
    wrapper
      .instance()
      .UNSAFE_componentWillReceiveProps({
        name: "mikke mus",
        environment: [],
        query: { revision: "" },
      });
    expect(dispatch.args[0][0].type).to.equal("ENVIRONMENT_FASIT_REQUEST");
    expect(dispatch.args[0][0].id).to.equal("p");
  });

  it('renders "CurrentRevision" with props', () => {
    const wrapper = shallow(
      <Environment {...props} query={{ revision: "mikke" }} revisions="mus" />
    );
    expect(wrapper.find(CurrentRevision)).to.have.length(1);
    expect(wrapper.find(CurrentRevision).props().revisionId).to.equal("mikke");
    expect(wrapper.find(CurrentRevision).props().revisions).to.equal("mus");
  });

  it('renders "Card"', () => {
    const wrapper = shallow(<Environment {...props} />);
    expect(wrapper.find(Card)).to.have.length(1);
  });

  it('renders "ToolButtons" with props', () => {
    const wrapper = shallow(<Environment {...props} />);
    expect(wrapper.find(ToolButtons)).to.have.length(1);
    expect(wrapper.find(ToolButtons).props().disabled).to.equal(true);
    expect(wrapper.find(ToolButtons).props().onEditClick).to.be.instanceof(
      Function
    );
    expect(wrapper.find(ToolButtons).props().onDeleteClick).to.be.instanceof(
      Function
    );
    expect(wrapper.find(ToolButtons).props().onCopyClick).to.be.instanceof(
      Function
    );
    expect(wrapper.find(ToolButtons).props().editMode).to.equal(false);
  });

  it('renders "Lifecycle" with props', () => {
    const wrapper = shallow(<Environment {...props} />);
    expect(wrapper.find(Lifecycle)).to.have.length(1);
  });
});

const props = {
  name: "p",
  user: {
    authenticated: false,
    failedLogin: false,
    showLogin: false,
    identity: "anonymousUser",
    roles: [],
    displayname: "anonymousUser",
    groups: [],
  },
  environment: {
    name: "p",
    environmentclass: "p",
    id: 103373,
    revision: 3236864,
    lifecycle: {},
    accesscontrol: {
      environmentclass: "p",
      adgroups: [],
    },
    links: {
      nodes: "https://e34jbsl01655.devillo.no:8443/api/v2/nodes?environment=p",
      self: "https://e34jbsl01655.devillo.no:8443/api/v2/environments/p",
      revisions:
        "https://e34jbsl01655.devillo.no:8443/api/v2/environments/p/revisions",
      clusters:
        "https://e34jbsl01655.devillo.no:8443/api/v2/environments/p/clusters",
    },
  },
  environmentClasses: ["u", "t", "q", "p"],
  revisions: {
    isFetching: false,
    requestFailed: false,
    data: [
      {
        revision: 3236864,
        timestamp: "2017-10-12T15:27:35.728",
        author: "Service User",
        onbehalfof: {
          id: "srvorchestrator",
          exists: false,
        },
        authorid: "srvbasta",
        message: "Slettet a30jbsl00219.oera.no i Basta av h141513",
        revisiontype: "mod",
        links: {
          entity:
            "https://e34jbsl01655.devillo.no:8443/api/v2/environments/p/revisions/3236864",
        },
      },
      {
        revision: 3236863,
        timestamp: "2017-10-12T15:01:21.441",
        author: "Service User",
        onbehalfof: {
          id: "srvorchestrator",
          exists: false,
        },
        authorid: "srvbasta",
        message: "Bestilt i Basta av h141513",
        revisiontype: "mod",
        links: {
          entity:
            "https://e34jbsl01655.devillo.no:8443/api/v2/environments/p/revisions/3236863",
        },
      },
      {
        revision: 3236860,
        timestamp: "2017-10-12T15:00:36.182",
        author: "Service User",
        onbehalfof: {
          id: "srvorchestrator",
          exists: false,
        },
        authorid: "srvbasta",
        message: "Bestilt i Basta av h141513",
        revisiontype: "mod",
        links: {
          entity:
            "https://e34jbsl01655.devillo.no:8443/api/v2/environments/p/revisions/3236860",
        },
      },
    ],
  },
  query: {},
};
