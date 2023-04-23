import { SyncWalker } from './sync'
import { AsyncWalker } from './async'
import type { SyncHandler } from './sync'
import type { AsyncHandler } from './async'
import type { Node } from './types/index'

/**
 * @param {Node} ast
 * @param {{
 *   enter?: SyncHandler
 *   leave?: SyncHandler
 * }} walker
 * @returns {Node | null}
 */
export function walk(
  ast: Node,
  { enter, leave }: { enter: SyncHandler, leave: SyncHandler },
) {
  const instance = new SyncWalker(enter, leave)
  return instance.visit(ast, null)
}

/**
 * @param {Node} ast
 * @param {{
 *   enter?: AsyncHandler
 *   leave?: AsyncHandler
 * }} walker
 * @returns {Promise<Node | null>}
 */
export async function asyncWalk(
  ast: Node,
  { enter, leave }: { enter: AsyncHandler, leave: AsyncHandler },
) {
  const instance = new AsyncWalker(enter, leave)
  const res = await instance.visit(ast, null)
  return res
}
