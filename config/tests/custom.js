/* eslint-disable class-methods-use-this */
/* eslint-disable no-empty-function */
/* eslint-disable object-shorthand */
// Stolen from: https://github.com/ipfs/jest-environment-aegir/blob/master/src/index.js
// Overcomes error from jest internals.. this thing: https://github.com/facebook/jest/issues/6248
const NodeEnvironment = require('jest-environment-node')

class MyEnvironment extends NodeEnvironment {
  constructor(config) {
    super({
      ...config,
      globals: {
        ...config.globals,
        Uint32Array: Uint32Array,
        Uint8Array: Uint8Array,
        ArrayBuffer: ArrayBuffer,
      },
    })
  }

  async setup() {}

  async teardown() {}
}

module.exports = MyEnvironment
