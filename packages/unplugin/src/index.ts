import { createUnplugin } from 'unplugin'

const VIRTUAL_ENTRY_ALIAS = [/^(?:virtual:)?icestack(?::(.+))?\.css(\?.*)?$/]

const RESOLVED_ID_WITH_QUERY_RE = /[/\\]__icestack(?:(_.*?))?\.css(\?.*)?$/
const RESOLVED_ID_RE = /[/\\]__icestack(?:(_.*?))?\.css$/
const REPLACE_SEARCH_VALUE = /(\\?")?#icestack\s*{\s*query\s*:\s*(.+?);?\s*}/

export function resolveId(id: string) {
  if (RESOLVED_ID_WITH_QUERY_RE.test(id)) return id

  for (const alias of VIRTUAL_ENTRY_ALIAS) {
    const match = id.match(alias)
    if (match) {
      return match[1] ? `/__icestack_${match[1]}.css` : '/__icestack.css'
    }
  }
}

export default createUnplugin(() => {
  const virtualModuleId = 'virtual:icestack.css'
  const resolvedVirtualModuleId = '/__icestack.css'
  // const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'icestack-unplugin',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return '#icestack{query:all;}'
      }
    },
    vite: {
      renderChunk: {
        handler(code, chunk, options, meta) {
          // console.log(chunk.modules)
        }
      },
      generateBundle: {
        handler(options, bundle, isWrite) {
          const files = Object.keys(bundle).filter((i) => i.endsWith('.css'))

          for (const file of files) {
            const chunk = bundle[file]
            if (chunk.type === 'asset' && typeof chunk.source === 'string') {
              chunk.source = chunk.source.replace(REPLACE_SEARCH_VALUE, `.xxxxx{color:red;}`)
            } else if (chunk.type === 'chunk' && typeof chunk.code === 'string') {
              // js
            }
          }
        }
      }
    }
  }
})
