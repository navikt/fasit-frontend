// Shim for legacy react-bootstrap/react-overlays that accesses React.PropTypes directly.
// Remove this file when react-bootstrap is upgraded to a version that uses the prop-types package.
var React = require('react')
var PropTypes = require('prop-types')
var createReactClass = require('create-react-class')
if (!React.PropTypes) {
  React.PropTypes = PropTypes
}
if (!React.createClass) {
  React.createClass = createReactClass
}
