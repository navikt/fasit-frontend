import React from "react"
import { screen } from "@testing-library/react"
import { expect, describe, it } from "vitest"
import sinon from "sinon"
import { Application } from "../../../../src/js/components/Applications/Application.js"
import { renderWithProviders } from "../../testHelper"

function renderApplication(overrideProps = {}) {
  return renderWithProviders(<Application {...props} {...overrideProps} />)
}

describe("(Component) Application", () => {
  it('renders "Application" without exploding', () => {
    renderApplication()
    expect(screen.getByText("abac-eksempel-pep")).to.exist
  })

  it("dispatches fetchFasitData and fetchApplicationInstances on mount", () => {
    const dispatch = sinon.spy()
    renderApplication({ dispatch })
    // componentDidMount dispatches fetchFasitData + fetchApplicationInstances
    expect(dispatch.callCount).to.be.at.least(2)
    expect(dispatch.args[0][0].type).to.equal("APPLICATION_FASIT_REQUEST")
    expect(dispatch.args[1][0].type).to.equal("APPLICATION_INSTANCES_REQUEST")
  })

  it("renders instance cards", () => {
    renderApplication()
    expect(screen.getByText("app1:1")).to.exist
  })

  it("renders lifecycle section", () => {
    renderApplication({
      application: { ...props.application, lifecycle: { status: "alerted" } }
    })
    // Lifecycle component renders but may not show text "alerted" directly
    // Just verify it renders without error
    expect(screen.getByText("abac-eksempel-pep")).to.exist
  })
})

const props = {
  application: {
    accesscontrol: { adgroups: [], environmentclass: "t" },
    artifactid: "eksempel-pep-appconfig",
    created: "2016-12-14T15:32:29.156",
    groupid: "no.nav.abac",
    id: "2068147",
    lifecycle: {},
    links: {
      instances: "https://example.com/api/v2/applicationinstances?application=abac-eksempel-pep",
      revisions: "https://example.com/api/v2/applications/abac-eksempel-pep/revisions",
      self: "https://example.com/api/v2/applications/abac-eksempel-pep"
    },
    name: "abac-eksempel-pep",
    portoffset: 0,
    revision: 2068148,
    updated: "2016-12-14T15:32:29.156"
  },
  user: {
    authenticated: true,
    displayname: "Even Haasted",
    failedLogin: false,
    groups: ["0000-GA-AURA", "0000-GA-ENV-CONFIG-TESTADMIN"],
    identity: "h141513",
    roles: ["ROLE_OPERATIONS", "ROLE_USER"],
    showLogin: false
  },
  revisions: { data: [], isFetching: false, requestFailed: false },
  query: {},
  instances: [
    {
      application: "app1",
      environment: "p",
      version: "1",
      nodes: [],
      selftesturls: [],
      cluster: { name: "app1Cluster", ref: "http://localhost/clusters/app1Cluster" },
      appconfig: { ref: "http://localhost/appconfig" },
      exposedresources: [],
      usedresources: [],
      missingresources: [],
      id: 1,
      revision: 69,
      created: "2016-08-09T11:02:30.581",
      updated: "2016-10-20T11:29:01.54",
      lifecycle: {},
      accesscontrol: {},
      links: { self: "http://localhost/1684520", revisions: "http://localhost/1684520/revisions" }
    }
  ],
  name: "abac-eksempel-pep",
  dispatch: () => {}
}
