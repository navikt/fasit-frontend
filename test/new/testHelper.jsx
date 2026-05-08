import React from "react"
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import { Provider } from "react-redux"
import { legacy_createStore as createStore } from "redux"
import rootReducer from "../../src/js/reducers"

function createMockStore(preloadedState) {
  const store = createStore(rootReducer)
  if (preloadedState) {
    return createStore(rootReducer, { ...store.getState(), ...preloadedState })
  }
  return store
}

export function renderWithProviders(ui, { state, ...renderOptions } = {}) {
  const store = createMockStore(state)
  function Wrapper({ children }) {
    return (
      <Provider store={store}>
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    )
  }
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}
