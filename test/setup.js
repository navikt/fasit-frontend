import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Temporary shims: react-router@2 and material-ui@0.18 use APIs removed in React 16.
// Remove when those packages are upgraded (Phases 13 and 14).
React.PropTypes = PropTypes
React.createClass = createReactClass

Enzyme.configure({ adapter: new Adapter() })
