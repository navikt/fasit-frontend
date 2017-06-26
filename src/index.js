import React from 'react';
import ReactDOM from 'react-dom';
import "babel-polyfill"
import {browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {Root} from './js/components/Root/Root'
import {configureStore} from './js/store/configureStore'
import {SET_FILTER_CONTEXT, RECEIVE_CONFIGURATION} from './js/actionTypes'
import injectTapEventPlugin from 'react-tap-event-plugin'


const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

history.listen(location => store.dispatch({type: SET_FILTER_CONTEXT, value: location.pathname.split("/")[1]}))
injectTapEventPlugin()

// /config inneholder alle eksterne APIer, slik at vi slipper å bruke proxy.
fetch('/config')
    .then(res => {
        if (res.status !== 200) {
            const errorMessage = `${res.status}:${res.statusText}`
            throw new Error(errorMessage)
        }
        res.json()
            .then(value => {
                store.dispatch({type: RECEIVE_CONFIGURATION, value})
                ReactDOM.render(
                    <Root store={store} history={history}/>, document.getElementById('content')
                )
            })

    })
    .catch(err => {
        console.log("error", err)
        ReactDOM.render(
            <div>Unable to fetch config - You need to fix your /config response in express, fool.</div>, document.getElementById('content')
        )
    })

