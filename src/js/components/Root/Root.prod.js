import React from 'react';
import {Provider} from 'react-redux';
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
import history from '../../history'
import getRoutes from '../../routes'

export default function Root({ store }) {
    return (
        <Provider store={store}>
            <HistoryRouter history={history} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                {getRoutes()}
            </HistoryRouter>
        </Provider>
    );
}
