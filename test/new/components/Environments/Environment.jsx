import React from "react"
import { screen } from "@testing-library/react"
import { expect, describe, it } from "vitest"
import sinon from "sinon"
import { Environment } from "../../../../src/js/components/Environments/Environment"
import { renderWithProviders } from "../../testHelper"

function renderEnvironment(overrideProps = {}) {
  return renderWithProviders(<Environment {...props} {...overrideProps} />)
}

describe("(Component) Environment", () => {
  it('renders "Environment" without exploding', () => {
    renderEnvironment()
    expect(screen.getByText("p")).to.exist
  })

  it("dispatches fetch on mount", () => {
    const dispatch = sinon.spy()
    renderEnvironment({ dispatch })
    expect(dispatch.calledOnce).to.equal(true)
    expect(dispatch.args[0][0].type).to.equal("ENVIRONMENT_FASIT_REQUEST")
    expect(dispatch.args[0][0].id).to.equal("p")
  })
})

const props = {
  name: "p",
  user: {
    authenticated: false,
    failedLogin: false,
    showLogin: false,
    identity: "anonymousUser",
    roles: [],
    displayname: "anonymousUser",
    groups: []
  },
  environment: {
    name: "p",
    environmentclass: "p",
    id: 103373,
    revision: 3236864,
    lifecycle: {},
    accesscontrol: { environmentclass: "p", adgroups: [] },
    links: {
      nodes: "https://example.com/api/v2/nodes?environment=p",
      self: "https://example.com/api/v2/environments/p",
      revisions: "https://example.com/api/v2/environments/p/revisions",
      clusters: "https://example.com/api/v2/environments/p/clusters"
    }
  },
  environmentClasses: ["u", "t", "q", "p"],
  revisions: {
    isFetching: false,
    requestFailed: false,
    data: []
  },
  query: {},
  dispatch: () => {}
}
