import type { PluginCreator } from 'postcss'
import { get, set } from 'lodash'
import { defu, objHash } from '@icestack/shared'
import type { CvaParams, CvaParamsSet } from './types'
import { cvaSymbol, defaultParser, extractParams, getParentRule, pickComment, setAdd } from './regex'

export interface ExtractOption {
  prefix: string
  process: (res?: CvaParams) => void
  remove: boolean
  filter: (id: unknown) => boolean
}

const creator: PluginCreator<Partial<ExtractOption>> = (opts) => {
  const {
    process,
    prefix: _prefix,
    remove,
    filter,
  } = defu<ExtractOption, Partial<ExtractOption>[]>(opts, {
    filter: () => true,
    remove: true,
  })

  return {
    postcssPlugin: 'postcss-icestack-extract-cva-params-plugin',
    prepare(res) {
      const result: CvaParamsSet = {
        base: new Set<string>(),
        variants: {},
        compoundVariants: [],
        defaultVariants: {},
        meta: {},
      }
      const prefix = _prefix ?? ''
      const hashMap = new Map<string, CvaParamsSet['compoundVariants'][number]>()
      const weakMap = new WeakMap()

      function addBase(value: string | string[]) {
        setAdd(result.base, value)
      }

      function addVariant(
        value: string | string[],
        entries: [
          string,
          {
            value: string
          },
        ][],
      ) {
        for (const [p1, { value: p2 }] of entries) {
          const p = `${p1}.${p2}`
          const arr = get(result.variants, p)

          if (arr instanceof Set) {
            setAdd(arr, value)
          }
          else {
            const st = new Set<string>()
            setAdd(st, value)
            set(result.variants, p, st)
          }
        }
      }

      function addDefaultVariant(
        entries: [
          string,
          {
            value: string
          },
        ][],
      ) {
        for (const [key, { value }] of entries) {
          set(result.defaultVariants, key, value)
        }
      }

      function addCompoundVariant(
        value: string | string[],
        entries: [
          string,
          {
            value: string
          },
        ][],
        hashCode: string,
      ) {
        const item = hashMap.get(hashCode)
        if (item) {
          item.class && setAdd(item.class, value)
        }
        else {
          const set = new Set<string>()
          setAdd(set, value)

          hashMap.set(
            hashCode,
            // @ts-ignore
            entries.reduce(
              (acc, [k, { value }]) => {
                // @ts-ignore
                acc[k] = value
                return acc
              },
              {
                class: set,
              },
            ),
          )
        }
      }

      const filename = res.root.source?.input.file
      if (filename) {
        const skip = !filter(filename)
        if (skip) {
          return {}
        }
      }

      // res.root
      return {
        Comment(comment) {
          const res = pickComment(comment)
          if (res) {
            weakMap.set(comment, cvaSymbol)
            const { next, suffix, type } = res
            const { query, params } = extractParams(suffix, res)
            const hashCode = objHash(query)
            const entries = Object.entries(query)

            if (next) {
              const rule = getParentRule(comment)

              if (rule) {
                const ast = defaultParser.astSync(rule.selector)

                let value: string | undefined
                ast.walkClasses((cls) => {
                  value = cls.value
                  // return false
                })

                if (value) {
                  // value = prefix + value
                  switch (type) {
                    case 'base': {
                      addBase(value)

                      break
                    }
                    case 'variant': {
                      addVariant(value, entries)

                      break
                    }
                    case 'compoundVariant': {
                      addCompoundVariant(value, entries, hashCode)

                      break
                    }
                  }
                }
              }
            }
            else {
              switch (type) {
                case 'defaultVariant': {
                  addDefaultVariant(entries)

                  break
                }
                case 'base': {
                  addBase(params.map(x => prefix + x))

                  break
                }
                case 'variant': {
                  addVariant(
                    params.map(x => prefix + x),
                    entries,
                  )

                  break
                }
                case 'compoundVariant': {
                  addCompoundVariant(
                    params.map(x => prefix + x),
                    entries,
                    hashCode,
                  )

                  break
                }
                case 'meta': {
                  for (const [key, { value }] of entries) {
                    result.meta[key] = value
                  }
                }
              }
            }
          }
        },
        CommentExit(comment) {
          if (remove && weakMap.get(comment) === cvaSymbol) {
            comment.remove()
          }
        },
        OnceExit(root) {
          result.compoundVariants = [...hashMap.values()]

          process?.({
            base: [...result.base],
            compoundVariants: result.compoundVariants.map((x) => {
              return {
                ...x,
                class: [...x.class],
              }
            }) as CvaParams['compoundVariants'],
            defaultVariants: result.defaultVariants,
            variants: Object.entries(result.variants).reduce<CvaParams['variants']>((acc, [k, v]) => {
              acc[k] = Object.entries(v).reduce<Record<string, string[]>>((bcc, [k1, v1]) => {
                bcc[k1] = [...v1]
                return bcc
              }, {})
              return acc
            }, {}),
            meta: result.meta,
            file: root.source?.input.file,
            // root
          })
        },
      }
    },
  }
}

creator.postcss = true

export default creator
