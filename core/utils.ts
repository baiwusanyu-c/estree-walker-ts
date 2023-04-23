/**
 * Ducktype a node.
 */
export function isNode(value: unknown) {
  return (
    value !== null && typeof value === 'object' && 'type' in value && typeof value.type === 'string'
  )
}
