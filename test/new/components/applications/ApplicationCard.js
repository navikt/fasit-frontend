import React from "react"
import { render, screen } from "@testing-library/react"
import { expect, describe, it } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { ApplicationCard } from "../../../../src/js/components/Applications/ApplicationCard.js"

function renderCard(overrideProps = {}) {
  return render(
    <MemoryRouter>
      <ApplicationCard {...props} {...overrideProps} />
    </MemoryRouter>
  )
}

describe("(Component) ApplicationCard", () => {
  it('renders "ApplicationCard" without exploding', () => {
    renderCard()
    expect(screen.getByText("abac-eksempel-pep")).to.exist
  })

  it("renders application name as a link", () => {
    renderCard()
    const link = screen.getByText("abac-eksempel-pep")
    expect(link.closest("a").getAttribute("href")).to.equal("/applications/abac-eksempel-pep")
  })

  it("renders CardInfo with lastUpdated", () => {
    renderCard()
    // CardInfo renders date from application.updated
    expect(screen.getByText(/14 Dec 2016/)).to.exist
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
  history: { push: () => {} }
}
