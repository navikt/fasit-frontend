import React from "react";
import * as DOM from "react-dom";
import { Router } from "react-router-dom";
import history from "./js/utils/browserHistory";
import configureStore from "./js/store/configureStore";
import { Provider } from "react-redux";
import App from "./js/components/Root/App";
import { RECEIVE_CONFIGURATION } from "./js/actionTypes";

const store = configureStore();

function Application() {
  return (
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  );
}

// /config inneholder alle eksterne APIer, slik at vi slipper å bruke proxy.
fetch("/config")
  .then((res) => {
    if (res.status !== 200) {
      const errorMessage = `${res.status}:${res.statusText}`;
      throw new Error(errorMessage);
    }
    res.json().then((value) => {
      store.dispatch({ type: RECEIVE_CONFIGURATION, value });
      DOM.render(<Application />, document.getElementById("content"));
    });
  })
  .catch((err) => {
    console.log("error", err);
    DOM.render(
      <div>
        Unable to fetch config - You need to fix your /config response in
        express, fool.
      </div>,
      document.getElementById("content")
    );
  });
