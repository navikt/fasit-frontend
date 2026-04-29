// Temporary compatibility shims for libraries that use APIs removed in React 16.
// react-router@2 and material-ui@0.18 access React.PropTypes and React.createClass directly.
// Remove this file after Phase 13 (react-router upgrade) and Phase 14 (material-ui upgrade).
var React = require('react')
React.PropTypes = require('prop-types')
React.createClass = require('create-react-class')
