import { createMemoryHistory } from "history"

// Memory-only history used as an event bus for sagas/components
// to signal navigation intent. NavigationSync forwards these
// to React Router which owns the real browser history.
const history = createMemoryHistory()

export default history
