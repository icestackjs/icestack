// @ts-nocheck
import Tokenizer from 'css-selector-tokenizer'
import type { PluginCreator } from 'postcss'
import { defuOverrideArray } from '@icestack/shared'
import type { PrefixerOptions } from '@icestack/types'

function itMatchesOne(arr, term) {
  return arr.some((i) => term.search(i) >= 0)
}

function parseAttrSelector(node) {
  const { content } = node
  const regex = /(^class|^id)([$*=?^|~]*)+(?:("\s*)([^"\\]*?(?:\\.[^"\\]*)*?)(\s*")|('\s*)([^'\\]*?(?:\\.[^'\\]*)*?)(\s*'))/i

  const [type, operator, head, classes, foot] = content.split(regex).filter(Boolean)

  return {
    type,
    operator,
    head,
    classes: classes ? classes.split(' ').map((c) => c.replaceAll(/"|'/g, '')) : [],
    foot
  }
}

function attrStringify({ type, operator, head, classes, foot }) {
  return `${type}${operator || ''}${head || ''}${classes.join(' ')}${foot || ''}`
}

function prefixNode(node, prefix) {
  if (['class', 'id'].includes(node.type)) {
    return {
      ...node,
      name: `${prefix}${node.name}`
    }
  }

  if (['attribute'].includes(node.type) && node.content) {
    const { type, operator, head, classes, foot } = parseAttrSelector(node)

    if (!['class', 'id'].includes(type)) return node

    return {
      ...node,
      content: attrStringify({
        type,
        operator,
        head,
        classes: classes.map((cls) => `${prefix}${cls}`),
        foot
      })
    }
  }

  return node
}

function iterateSelectorNodes(selector: Tokenizer.SelectorsNode | Tokenizer.SelectorNode, options: Required<Options>) {
  const { prefix, ignore } = options
  return {
    ...selector,
    nodes: selector.nodes.map((node) => {
      if (['selector', 'nested-pseudo-class'].includes(node.type)) {
        return iterateSelectorNodes(node, options)
      }

      if (itMatchesOne(ignore, Tokenizer.stringify(node))) return node

      return prefixNode(node, prefix)
    })
  }
}

const postcssPlugin = 'addprefix'

const creator: PluginCreator<PrefixerOptions> = (opts = {}) => {
  const { prefix, ignore } = defuOverrideArray<PrefixerOptions, PrefixerOptions[]>(opts, {
    prefix: '',
    ignore: []
  })

  if (typeof prefix !== 'string') {
    throw new TypeError('prefix option should be of type string.')
  }

  if (!Array.isArray(ignore)) {
    throw new TypeError('ignore options should be an Array.')
  }

  if (prefix.length === 0)
    return {
      postcssPlugin
    }

  return {
    postcssPlugin,
    Once(root) {
      root.walkRules((rule) => {
        const parsed = Tokenizer.parse(rule.selector)
        const selector = iterateSelectorNodes(parsed, { prefix, ignore })

        rule.selector = Tokenizer.stringify(selector)
      })
    }
  }
}
creator.postcss = true

export default creator
