import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router'
import getRoutes from '../../routes'

export default class Root extends Component {
    render() {
        const {store, history} = this.props
        return (
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    {getRoutes()}
                </ConnectedRouter>
            </Provider>
        );
    }
};
