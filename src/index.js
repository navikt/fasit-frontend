import React from "react"
import { createRoot } from "react-dom/client"
import history from "./js/history"
import { Root } from "./js/components/Root/Root"
import { configureStore } from "./js/store/configureStore"
import { SET_FILTER_CONTEXT, RECEIVE_CONFIGURATION } from "./js/actionTypes"
import { locationChange } from "./js/reducers/router"

const store = configureStore()

const root = createRoot(document.getElementById("content"))

history.listen(({ location, action }) => {
  store.dispatch(locationChange(location, action))
  store.dispatch({
    type: SET_FILTER_CONTEXT,
    value: location.pathname.replace(/^\//g, "").split("/")[0]
  })
})

// /config inneholder alle eksterne APIer, slik at vi slipper å bruke proxy.
fetch("/config")
  .then(res => {
    if (res.status !== 200) {
      const errorMessage = `${res.status}:${res.statusText}`
      throw new Error(errorMessage)
    }
    res.json().then(value => {
      store.dispatch({ type: RECEIVE_CONFIGURATION, value })
      root.render(<Root store={store} />)
    })
  })
  .catch(err => {
    console.log("error", err)
    root.render(
      <div>Unable to fetch config - You need to fix your /config response in express, fool.</div>
    )
  })
