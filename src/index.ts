import { parsers as javascriptParsers } from 'prettier/parser-babel'
import { parsers as typescriptParsers } from 'prettier/parser-typescript'

import { plugin } from './Plugin'

module.exports = {
  parsers: {
    typescript: { ...typescriptParsers.typescript, preprocess: plugin.preprocess },
    babel: { ...javascriptParsers.babel, preprocess: plugin.preprocess },
  },
}
