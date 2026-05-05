// Replacement for react-overlays/lib/Portal that uses React.createPortal
// instead of the removed unstable_renderSubtreeIntoContainer (React 18+)
'use strict';

var React = require('react');
var ReactDOM = require('react-dom');

var getContainer = require('react-overlays/lib/utils/getContainer');

class Portal extends React.Component {
  constructor(props) {
    super(props);
    this._overlayTarget = null;
    this._portalContainerNode = null;
  }

  componentDidMount() {
    this._mountOverlayTarget();
    this.forceUpdate();
  }

  componentDidUpdate(prevProps) {
    if (this._overlayTarget && prevProps.container !== this.props.container) {
      this._portalContainerNode.removeChild(this._overlayTarget);
      this._portalContainerNode = getContainer(this.props.container, document.body);
      this._portalContainerNode.appendChild(this._overlayTarget);
    }
  }

  componentWillUnmount() {
    this._unmountOverlayTarget();
  }

  _mountOverlayTarget() {
    if (!this._overlayTarget) {
      this._overlayTarget = document.createElement('div');
      this._portalContainerNode = getContainer(
        this.props.container,
        document.body
      );
      if (this._portalContainerNode) {
        this._portalContainerNode.appendChild(this._overlayTarget);
      }
    }
  }

  _unmountOverlayTarget() {
    if (this._overlayTarget && this._portalContainerNode) {
      this._portalContainerNode.removeChild(this._overlayTarget);
      this._overlayTarget = null;
    }
    this._portalContainerNode = null;
  }

  getMountNode() {
    return this._overlayTarget;
  }

  render() {
    if (!this._overlayTarget) {
      return null;
    }

    var overlay = !this.props.children ? null : React.Children.only(this.props.children);
    if (overlay === null) {
      return null;
    }

    return ReactDOM.createPortal(overlay, this._overlayTarget);
  }
}

module.exports = Portal;
