// Temporary compatibility shims for libraries that use APIs removed in React 16.
// material-ui@0.18 accesses React.PropTypes and React.createClass directly.
// Remove this file after Phase 14 (material-ui upgrade).
var React = require('react')
React.PropTypes = require('prop-types')
React.createClass = require('create-react-class')
