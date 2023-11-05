import postcss from 'postcss'
import { set, get } from 'lodash'

// function recursive(obj: Record<string, any>) {
//   for (const k in obj) {
//     if (Object.prototype.hasOwnProperty.call(obj, k)) {
//       if (typeof obj[k] === 'object') {
//         recursive(obj[k])
//       } else {
//         console.log(`${k}:${obj[k]}`)
//       }
//     }
//   }
// }

function recursiveNodes(nodes: postcss.ChildNode[], result: Record<string, any> = {}) {
  for (const node of nodes) {
    switch (node.type) {
      case 'atrule': {
        const selector = `@${node.name} ${node.params}`
        result[selector] = {}
        recursiveNodes(node.nodes, result[selector])
        break
      }
      case 'rule': {
        result[node.selector] = {}
        recursiveNodes(node.nodes, result[node.selector])
        break
      }
      case 'decl': {
        set(result, `css.${node.prop}`, node.value)
        break
      }
      // No default
    }
  }
  return result
}

describe('transformCss', () => {
  it('case0', () => {
    const case0Css = `.alert {
      display: grid;
      width: 100%;
      &-primary {
        color: red;
      }
      &.alert-hover{
        &:hover{
          color: blue;
        }
      }
    }
    @media (min-width: 640px) {
      .alert {
          grid-auto-flow: column;
          grid-template-columns: auto minmax(auto,1fr);
          justify-items: start;
          text-align: left
      }
    }`
    const root = postcss.parse(case0Css)
    const result = recursiveNodes(root.nodes)
    expect(result).toMatchSnapshot()
  })
})
