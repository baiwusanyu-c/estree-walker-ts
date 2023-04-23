import { WalkerBase } from './walker'
import { isNode } from './utils'
import type { Parent } from './walker'
import type { Node } from './types/index'

export type SyncHandler = (
  node: Node,
  parent: Parent | null,
  prop?: keyof Parent,
  index?: number | null
) => void

export class SyncWalker extends WalkerBase {
  private enter: SyncHandler | undefined
  private leave: SyncHandler | undefined
  constructor(
    enter: SyncHandler | undefined,
    leave: SyncHandler | undefined,
  ) {
    super()
    this.should_skip = false
    this.should_remove = false
    this.replacement = null
    this.context = {
      skip: () => (this.should_skip = true),
      remove: () => (this.should_remove = true),
      replace: node => (this.replacement = node),
    }

    this.enter = enter

    this.leave = leave
  }

  /**
   * @template {Node} Parent
   * @param {Node} node
   * @param {Parent | null} parent
   * @param {keyof Parent} [prop]
   * @param {number | null} [index]
   */
  visit(
    node: Node,
    parent: Parent | null,
    prop?: keyof Parent,
    index?: number | null) {
    if (node) {
      if (this.enter) {
        const _should_skip = this.should_skip
        const _should_remove = this.should_remove
        const _replacement = this.replacement
        this.should_skip = false
        this.should_remove = false
        this.replacement = null

        this.enter.call(this.context, node, parent, prop, index)

        if (this.replacement) {
          node = (this.replacement as Node)
          this.replace(parent, prop, index, node)
        }

        if (this.should_remove)
          this.remove(parent, prop, index)

        const skipped = this.should_skip
        const removed = this.should_remove

        this.should_skip = _should_skip
        this.should_remove = _should_remove
        this.replacement = _replacement

        if (skipped) return node
        if (removed) return null
      }

      let key
      for (key in node) {
        const value = node[key as keyof typeof node]

        if (value && typeof value === 'object') {
          if (Array.isArray(value)) {
            const nodes = (value)
            for (let i = 0; i < nodes.length; i += 1) {
              const item = nodes[i] as unknown as Node
              if (isNode(item)) {
                if (!this.visit(item as unknown as Node, node, (key as keyof typeof node), i)) {
                  // removed
                  i--
                }
              }
            }
          } else if (isNode(value)) {
            this.visit(value as unknown as Node, node, (key as keyof typeof node), null)
          }
        }
      }

      if (this.leave) {
        const _replacement = this.replacement
        const _should_remove = this.should_remove
        this.replacement = null
        this.should_remove = false

        this.leave.call(this.context, node, parent, prop, index)

        if (this.replacement) {
          node = (this.replacement as Node)
          this.replace(parent, prop, index, node)
        }

        if (this.should_remove)
          this.remove(parent, prop, index)

        const removed = this.should_remove

        this.replacement = _replacement
        this.should_remove = _should_remove

        if (removed) return null
      }
    }

    return node
  }
}
