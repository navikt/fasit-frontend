// Patch for dom-helpers/query/contains to handle undefined context
// react-bootstrap@0.30 + React 16 can pass undefined DOM nodes
module.exports = function safeContains(context, node) {
  if (!context || !node) return false;
  if (context.contains) {
    return context.contains(node);
  }
  if (context.compareDocumentPosition) {
    return context === node || !!(context.compareDocumentPosition(node) & 16);
  }
  // fallback
  var current = node;
  do {
    if (current === context) return true;
  } while (current = current.parentNode);
  return false;
};
