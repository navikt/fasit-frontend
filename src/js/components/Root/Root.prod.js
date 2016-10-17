import React, { Component } from 'react';
import { Provider } from 'react-redux';

import getRoutes from '../../routes'


module.exports = class Root extends Component {
    render() {
        const { store , history } = this.props;
        return (

            <Provider store={store}>
                <Router history={history}>
                    {getRoutes}
                </Router>
            </Provider>

        );
    }
};
