import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Router} from 'react-router'
import DevTools from '../DevTools/DevTools';
import getRoutes from '../../routes'

module.exports = class Root extends Component {
    render() {
        const {store, history} = this.props
        return (
            <Provider store={store}>
                <div>
                    <Router history={history}>
                        {getRoutes()}
                    </Router>
                    <DevTools />
                </div>
            </Provider>
        );
    }
};
