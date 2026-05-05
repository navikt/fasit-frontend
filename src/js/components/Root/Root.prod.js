import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {unstable_HistoryRouter as HistoryRouter} from 'react-router-dom'
import history from '../../history'
import getRoutes from '../../routes'

export default class Root extends Component {
    render() {
        const {store} = this.props
        return (
            <Provider store={store}>
                <HistoryRouter history={history}>
                    {getRoutes()}
                </HistoryRouter>
            </Provider>
        );
    }
};
