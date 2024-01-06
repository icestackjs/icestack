import path from 'node:path'
import { createContext } from '@icestack/ui'
import ci from 'ci-info'
import { getCss } from './utils'
import { icestackPlugin } from '@/index'

describe.skipIf(ci.isCI)('tailwindcss', () => {
  const outdir = path.resolve(__dirname, 'assets')
  beforeAll(async () => {
    const ctx = createContext({
      outdir
    })
    await ctx.build()
  })
  it('not throw', () => {
    expect(() => {
      icestackPlugin({})
    }).not.toThrow()
  })

  it('use plugin case 0', async () => {
    const { css } = await getCss({
      content: [
        {
          raw: 'btn'
        }
      ],
      plugins: [
        icestackPlugin({
          loadDirectory: outdir
        })
      ]
    })
    expect(css).toMatchSnapshot()
  })

  // it('use plugin case 1', async () => {
  //   const { css } = await getCss({
  //     content: [
  //       {
  //         raw: 'btn'
  //       }
  //     ],
  //     plugins: [
  //       icestackPlugin({
  //         components: {
  //           button: {
  //             append: [
  //               {
  //                 '.btn::after': {
  //                   border: 'none'
  //                 }
  //               }
  //             ]
  //           }
  //         }
  //       })
  //     ]
  //   })
  //   expect(css).toMatchSnapshot()
  // })

  // it('use plugin case 2', async () => {
  //   const { css } = await getCss({
  //     content: [
  //       {
  //         raw: 'btn'
  //       }
  //     ],
  //     plugins: [
  //       icestackPlugin({
  //         presets: [miniprogramPreset()]
  //       })
  //     ]
  //   })
  //   expect(css).toMatchSnapshot()
  // })

  // const { default: base } = await import('../assets/js/base/index.js')
  // const { default: components } = await import('../assets/js/components/index.js')
  // const { default: utilities } = await import('../assets/js/utilities/index.js')
  // it('grouped components', () => {
  //   const dic = groupBy(Object.entries(components), ([name]) => {
  //     let com = name
  //     if (com.includes('/')) {
  //       com = name.split('/')[1]
  //     }
  //     return com
  //   })
  //   for (const key in dic) {
  //     if (Object.prototype.hasOwnProperty.call(dic, key)) {
  //       const arr = dic[key]
  //       // @ts-ignore
  //       dic[key] = arr.map((x) => x[1])
  //     }
  //   }
  //   expect(dic).toBeTruthy()
  // })

  // it('entries components', () => {
  //   const entries = Object.entries(
  //     groupBy(Object.entries(components), ([name]) => {
  //       let com = name
  //       if (com.includes('/')) {
  //         com = name.split('/')[1]
  //       }
  //       return com
  //     })
  //   ).map(([key, arr]) => {
  //     return [key, arr.map((x) => x[1])]
  //   })
  //   for (const [name, c] of entries) {
  //     if (Array.isArray(c)) {
  //       expect(merge.recursive(true, ...c)).toMatchSnapshot('merged')
  //       for (const cc of c) {
  //         if (typeof cc === 'string') {
  //           console.log(name, cc)
  //         }
  //       }
  //     }
  //   }

  //   expect(entries).toBeTruthy()
  //   // expect(entries).toMatchSnapshot('common')
  // })

  // it('utilitiesEntries', () => {
  //   const utilitiesEntries = Object.entries(
  //     groupBy(Object.entries(utilities), ([name]) => {
  //       let com = name
  //       if (com.includes('/')) {
  //         com = name.split('/')[1]
  //       }
  //       return com
  //     })
  //   ).map(([key, arr]) => {
  //     return [key, arr.map((x) => x[1])]
  //   })

  //   for (const [name, u] of utilitiesEntries) {
  //     if (Array.isArray(u)) {
  //       expect(merge.recursive(true, ...u)).toMatchSnapshot()
  //     }
  //   }
  // })
})
