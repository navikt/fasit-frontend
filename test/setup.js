import React from 'react'
import PropTypes from 'prop-types'
import createReactClass from 'create-react-class'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

// Shim for react-bootstrap's dependency on React.PropTypes (react-overlays)
React.PropTypes = PropTypes
React.createClass = createReactClass

Enzyme.configure({ adapter: new Adapter() })
