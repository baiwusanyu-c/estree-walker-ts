import { walk } from '@estree-walker-ts/core'
import { parse as babelParse } from '@babel/parser'
const testStr = `import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [],
  optimizeDeps: {
    disabled: true,
  },
  test: {
    clearMocks: true,
    environment: 'jsdom',
    transformMode: {
      web: [/\\.[jt]sx$/],
    },
  },
})
`
walk(babelParse(testStr, {
  sourceType: 'module',
  plugins: ['typescript'],
}), {
  enter: (node) => {
    console.log(node)
  },
  leave: (node) => {
    console.log(node)
  },
})
