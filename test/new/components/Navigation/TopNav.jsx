import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import TopNav from "../../../../src/js/components/Navigation/TopNav.jsx";

vi.mock("../../../../src/js/components/common/index", () => ({
  Login: () => null,
  AuraTools: () => null,
  NavSearch: () => null,
}));

vi.mock("../../../../src/js/components/Navigation/ContextMenu", () => ({
  default: () => null,
}));

vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: () => null,
}));

describe("(Component) TopNav", () => {
  it.each([
    ["FACTOR_PASSWORD", "ROLE_USER", "ROLE_PROD_OPERATIONS"],
    ["ROLE_USER", "ROLE_PROD_OPERATIONS"],
  ])(
    "displays application roles without authentication factors: %j",
    (...roles) => {
      render(
        <TopNav.WrappedComponent
          dispatch={vi.fn()}
          user={{ authenticated: true, displayName: "Test User", roles }}
          location={{ pathname: "/" }}
        />,
      );

      fireEvent.click(screen.getByRole("button", { name: "Test User" }));

      expect(screen.getByText("user")).to.exist;
      expect(screen.getByText("prod_operations")).to.exist;
      expect(screen.queryByText("factor_password")).to.equal(null);
    },
  );
});
