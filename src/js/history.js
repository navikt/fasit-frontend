import { createBrowserHistory, createMemoryHistory } from "history"

// Use memory history in test environments (no DOM), browser history otherwise
const history = typeof document !== "undefined"
  ? createBrowserHistory()
  : createMemoryHistory()

export default history
