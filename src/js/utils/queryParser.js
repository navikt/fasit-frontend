// Parse query string (e.g. "?revision=123") into an object { revision: "123" }
export function parseQuery(search) {
  if (!search) return {}
  const params = new URLSearchParams(search)
  const result = {}
  for (const [key, value] of params) {
    result[key] = value
  }
  return result
}
