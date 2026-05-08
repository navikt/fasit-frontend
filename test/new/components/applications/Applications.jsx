import React from "react"
import { screen } from "@testing-library/react"
import { expect, describe, it } from "vitest"
import sinon from "sinon"
import { Applications } from "../../../../src/js/components/Applications/Applications"
import { renderWithProviders } from "../../testHelper"

function renderApplications(overrideProps = {}) {
  return renderWithProviders(<Applications {...props} {...overrideProps} />)
}

describe("(Component) Applications", () => {
  it('renders "Applications" without exploding', () => {
    renderApplications()
    expect(screen.getByText("3 applications")).to.exist
  })

  it("dispatches filter search on mount when no application param", () => {
    const dispatch = sinon.spy()
    renderApplications({
      dispatch,
      match: { params: {} }
    })
    expect(dispatch.calledOnce).to.equal(true)
    expect(dispatch.args[0][0].type).to.equal("SUBMIT_FILTER_SEARCH")
    expect(dispatch.args[0][0].location).to.equal("applications")
  })

  it('does not render application cards when isFetching', () => {
    renderApplications({
      isFetching: true,
      match: { params: {} }
    })
    expect(screen.queryByText("a-inntekt")).to.not.exist
  })

  it("renders application cards", () => {
    renderApplications({ match: { params: {} } })
    expect(screen.getByText("a-inntekt")).to.exist
    expect(screen.getByText("aareg-core")).to.exist
    expect(screen.getByText("aareg-mldpusher")).to.exist
  })
})

const props = {
  location: { pathname: "/applications", search: "" },
  match: { params: {} },
  applications: [
    {
      name: "a-inntekt",
      groupid: "no.nav",
      artifactid: "a-inntekt-config",
      portoffset: 0,
      id: 618258,
      created: "2014-10-07T13:23:21.972",
      updated: "2014-10-07T13:24:01.43",
      lifecycle: {},
      accesscontrol: { environmentclass: "t", adgroups: [] },
      links: {
        instances: "https://example.com/api/v2/applicationinstances?application=a-inntekt",
        self: "https://example.com/api/v2/applications/a-inntekt",
        revisions: "https://example.com/api/v2/applications/a-inntekt/revisions"
      }
    },
    {
      name: "aareg-core",
      groupid: "no.nav.aareg-core",
      artifactid: "aareg-core-config",
      portoffset: 0,
      id: 3833,
      created: "2013-04-15T12:00:12.69",
      updated: "2013-05-21T14:14:14.854",
      lifecycle: {},
      accesscontrol: { environmentclass: "t", adgroups: [] },
      links: {
        instances: "https://example.com/api/v2/applicationinstances?application=aareg-core",
        self: "https://example.com/api/v2/applications/aareg-core",
        revisions: "https://example.com/api/v2/applications/aareg-core/revisions"
      }
    },
    {
      name: "aareg-mldpusher",
      groupid: "no.nav.aareg.mldpusher",
      artifactid: "mldpusher-config",
      portoffset: 0,
      id: 2704027,
      created: "2017-06-13T15:04:48.226",
      updated: "2017-06-13T15:04:48.226",
      lifecycle: {},
      accesscontrol: { environmentclass: "t", adgroups: [] },
      links: {
        instances: "https://example.com/api/v2/applicationinstances?application=aareg-mldpusher",
        self: "https://example.com/api/v2/applications/aareg-mldpusher",
        revisions: "https://example.com/api/v2/applications/aareg-mldpusher/revisions"
      }
    }
  ],
  totalCount: "3",
  isFetching: false,
  dispatch: () => {}
}