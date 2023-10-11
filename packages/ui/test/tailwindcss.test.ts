import plugin from 'tailwindcss/plugin'
import merge from 'merge'
import base from '../assets/js/base/index.js'
import components from '../assets/js/components/index.js'
import utilities from '../assets/js/utilities/index.js'
import { colors } from '@/colors.js'
import { groupBy } from '@/utils'

describe('tailwindcss', () => {
  it('grouped components', () => {
    const dic = groupBy(Object.entries(components), ([name]) => {
      let com = name
      if (com.includes('/')) {
        com = name.split('/')[1]
      }
      return com
    })
    for (const key in dic) {
      if (Object.prototype.hasOwnProperty.call(dic, key)) {
        const arr = dic[key]
        // @ts-ignore
        dic[key] = arr.map((x) => x[1])
      }
    }
    expect(dic).toBeTruthy()
  })

  it('entries components', () => {
    const entries = Object.entries(
      groupBy(Object.entries(components), ([name]) => {
        let com = name
        if (com.includes('/')) {
          com = name.split('/')[1]
        }
        return com
      })
    ).map(([key, arr]) => {
      return [key, arr.map((x) => x[1])]
    })
    for (const [name, c] of entries) {
      if (Array.isArray(c)) {
        expect(merge.recursive(true, ...c)).toMatchSnapshot('merged')
        for (const cc of c) {
          if (typeof cc === 'string') {
            console.log(name, cc)
          }
        }
      }
    }

    expect(entries).toBeTruthy()
    // expect(entries).toMatchSnapshot('common')
  })

  it('utilitiesEntries', () => {
    const utilitiesEntries = Object.entries(
      groupBy(Object.entries(utilities), ([name]) => {
        let com = name
        if (com.includes('/')) {
          com = name.split('/')[1]
        }
        return com
      })
    ).map(([key, arr]) => {
      return [key, arr.map((x) => x[1])]
    })

    for (const [name, u] of utilitiesEntries) {
      if (Array.isArray(u)) {
        expect(merge.recursive(true, ...u)).toMatchSnapshot()
      }
    }
  })
})
