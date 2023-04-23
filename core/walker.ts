
import type { Node } from './types/index'

export declare type Parent = Node

declare const replace: (node: Node) => void
declare const skip: () => void
declare const remove: () => void

declare interface walkerCtx {
  replace: typeof replace
  skip: typeof skip
  remove: typeof remove
}
export class WalkerBase {
  protected should_skip: boolean
  protected should_remove: boolean
  protected replacement: Node | null
  protected context: walkerCtx
  constructor() {
    /** @type {boolean} */
    this.should_skip = false

    /** @type {boolean} */
    this.should_remove = false

    /** @type {Node | null} */
    this.replacement = null

    /** @type {WalkerContext} */
    this.context = {
      skip: () => (this.should_skip = true),
      remove: () => (this.should_remove = true),
      replace: node => (this.replacement = node),
    }
  }

  replace(
    parent: Parent | null | undefined,
    prop: (keyof Parent) | null | undefined,
    index: number | null | undefined,
    node: Node) {
    if (parent && prop) {
      if (index != null) {
        /** @type {Array<Node>} */ ((parent[prop]) as unknown as Node[])[index] = node
      } else {
        /** @type {Node} */ ((parent[prop]) as unknown as Node) = node
      }
    }
  }

  remove(
    parent: Parent | null | undefined,
    prop: (keyof Parent) | null | undefined,
    index: number | null | undefined,
  ) {
    if (parent && prop) {
      if (index !== null && index !== undefined) {
        /** @type {Array<Node>} */ ((parent[prop]) as unknown as Node[]).splice(index, 1)
      } else {
        delete (parent[prop])
      }
    }
  }
}
