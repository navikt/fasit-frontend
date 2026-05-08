import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import NavigationSync from './NavigationSync'
import getRoutes from '../../routes'

export default function Root({ store }) {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <NavigationSync />
                {getRoutes()}
            </BrowserRouter>
        </Provider>
    );
}
