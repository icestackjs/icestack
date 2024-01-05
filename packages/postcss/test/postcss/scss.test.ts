import type { Node, Rule, ChildNode, Root, AtRule, Declaration, Comment } from 'postcss'
import { parse, stringify } from '@/scss'
import { compressCssSelector } from '@/index'

function getKey(node: AtRule | Rule | Root | Comment | Declaration) {
  switch (node.type) {
    case 'root': {
      return '#'
    }
    case 'atrule': {
      return '@' + node.name + ' ' + node.params
    }
    case 'rule': {
      return compressCssSelector(node.selector)
    }
    // No default
  }
  return '$'
}

function calcPath(node: AtRule | Rule): string[] {
  const paths: string[] = [getKey(node)]

  let parent: AtRule | Rule | Root = node.parent as AtRule | Rule | Root
  while (parent) {
    paths.push(getKey(parent as AtRule | Rule | Root))
    parent = parent.parent as AtRule | Rule | Root
  }
  return paths
}

// 从右到左
function merge(leftNode: AtRule | Rule | Root, rightNode: AtRule | Rule | Root) {
  // leftNode
  for (const right of rightNode.nodes) {
    let insertFlag = true
    for (const left of leftNode.nodes) {
      if (left.type === 'rule' && right.type === 'rule' && compressCssSelector(left.selector) === compressCssSelector(right.selector)) {
        merge(left, right)
        insertFlag = false
      } else if (left.type === 'atrule' && right.type === 'atrule' && left.params === right.params && left.name === right.name) {
        if (left.name === 'apply' && right.name === 'apply') {
          left.after(right)
        } else {
          merge(left, right)
        }
        insertFlag = false
      }
      // else if(left.type === 'decl' && right.type === 'decl'){
      //   if(left.prop === )
      // }
    }
    insertFlag && leftNode.push(right)
  }
}

describe('scss', () => {
  it('parse case 0', () => {
    const root = parse(` .avatar{
      @apply relative inline-flex;
    }`)

    const mergeItem = parse(` .avatar{
      @apply bg-xx;
    }`)
    merge(root, mergeItem)

    expect(root.toString()).toMatchSnapshot()
  })

  it('parse case 1', () => {
    const root = parse(` .avatar{
      @apply relative inline-flex;
    }`)

    const mergeItem = parse(` .avatar1{
      @apply bg-xx;
    }`)
    merge(root, mergeItem)

    expect(root.toString()).toMatchSnapshot()
  })

  it('parse case 2', () => {
    const root = parse(` .avatar{
      @apply relative inline-flex;
      color: blue;
    }`)

    const mergeItem = parse(` .avatar{
      @apply bg-xx;
      color: red;
    }`)
    merge(root, mergeItem)

    expect(root.toString()).toMatchSnapshot()
  })
  it('parse case 10', () => {
    const root = parse(` .avatar{
      @apply relative inline-flex;
      > div {
        @apply block aspect-square overflow-hidden;
      }
      img {
        @apply h-full w-full object-cover;
      }
      &.placeholder{
        > div{
          @apply flex items-center justify-center;
        }
      }
    }`)

    const mergeItem = parse(` .avatar{
      @apply bg-xx;
      > div {
        @apply mt-2;
        color:red;
      }
      &.placeholder{
        color:blue;
        > span{
          @apply flex items-center justify-center;
        }
        >     div{
          @apply text-xs;
        }
        >   div{
          @apply text-lg;

          bg: red;
        }
      }
    }`)
    merge(root, mergeItem)
    // const mkm = new Map()

    // root.walkAtRules((atRule) => {
    //   if (atRule.name === 'apply') {
    //     mkm.set(calcPath(atRule).join('|'), atRule)
    //   }
    // })

    // root.walkRules((rule) => {
    //   mkm.set(calcPath(rule).join('|'), rule)
    // })
    // override
    // root.each(mergeItem)
    // mergeItem.walkAtRules((atRule) => {
    //   if (atRule.name === 'apply') {
    //     const n = mkm.get(calcPath(atRule).join('|'))
    //     // mkm.set(, atRule)
    //   }
    // })

    // mergeItem.walkRules((rule) => {
    //   // mkm.set(calcPath(rule).join('|'), rule)
    // })

    expect(root.toString()).toMatchSnapshot()
  })
})
