import React from "react"
import { screen, fireEvent } from "@testing-library/react"
import { expect, describe, it } from "vitest"
import sinon from "sinon"
import { NewApplicationForm } from "../../../../src/js/components/Applications/NewApplicationForm"
import { renderWithProviders } from "../../testHelper"

function renderForm(overrideProps = {}) {
  return renderWithProviders(<NewApplicationForm {...props} {...overrideProps} />)
}

describe("(Component) NewApplicationForm", () => {
  it('renders "NewApplicationForm" without exploding', () => {
    renderForm()
    expect(screen.getByRole("dialog")).to.exist
  })

  it("renders modal when showNewApplicationForm is true", () => {
    renderForm()
    expect(screen.getByText("Name:")).to.exist
    expect(screen.getByText("Artifactid:")).to.exist
    expect(screen.getByText("Groupid:")).to.exist
    expect(screen.getByText("Portoffset:")).to.exist
  })

  it("dispatches closeForm action when close button clicked", () => {
    const dispatch = sinon.spy()
    renderForm({ dispatch })
    const closeBtn = screen.getByRole("button", { name: "X" })
    fireEvent.click(closeBtn)
    expect(dispatch.called).to.equal(true)
    const closeCall = dispatch.args.find(a => a[0].type === "SHOW_NEW_APPLICATION_FORM")
    expect(closeCall).to.exist
    expect(closeCall[0].value).to.equal(false)
  })

  it("renders FormComment", () => {
    renderForm()
    expect(screen.getByText("Comment")).to.exist
  })
})

const props = {
  showNewApplicationForm: true,
  application: {
    name: "a-inntekt",
    groupid: "no.nav",
    artifactid: "a-inntekt-config",
    portoffset: 0,
    id: 618258,
    revision: 618260,
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
  mode: "copy",
  dispatch: () => {}
}
