import plugin from 'tailwindcss/plugin'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'

import type { Config } from 'tailwindcss'
import { PluginAPI, PluginCreator } from 'tailwindcss/types/config'
import type { Mock } from 'vitest'
import { composePlugins } from '@/index'
// https://github.com/tailwindlabs/tailwindcss/blob/5542340a75d23396b7c9dca462e2958728415b2d/src/util/resolveConfig.js#L89
export function getCss(config: string | Config) {
  return postcss([
    tailwindcss({
      config
    })
  ])
    .process('@tailwind base;@tailwind components;@tailwind utilities;')
    .async()
}

const utilitiesPlugin = plugin(
  function ({ addUtilities, matchUtilities, theme }) {
    addUtilities({
      '.content-auto': {
        'content-visibility': 'auto'
      },
      '.content-hidden': {
        'content-visibility': 'hidden'
      },
      '.content-visible': {
        'content-visibility': 'visible'
      }
    })
    matchUtilities(
      {
        tab: (value) => ({
          tabSize: value
        })
      },
      { values: theme('tabSize') }
    )
  },
  {
    theme: {
      tabSize: {
        1: '1',
        2: '2',
        4: '4',
        8: '8'
      }
    }
  }
)

const componentsPlugin = plugin(function ({ addComponents }) {
  addComponents({
    '.btn': {
      padding: '.5rem 1rem',
      borderRadius: '.25rem',
      fontWeight: '600'
    },
    '.btn-blue': {
      backgroundColor: '#3490dc',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#2779bd'
      }
    },
    '.btn-red': {
      backgroundColor: '#e3342f',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#cc1f1a'
      }
    }
  })
})

const basePlugin = plugin(function ({ addBase, theme }) {
  addBase({
    h1: { fontSize: theme('fontSize.2xl') },
    h2: { fontSize: theme('fontSize.xl') },
    h3: { fontSize: theme('fontSize.lg') }
  })
})

const variants = plugin(
  function ({ addVariant, matchVariant }) {
    addVariant('optional', '&:optional')
    addVariant('hocus', ['&:hover', '&:focus'])
    addVariant('inverted-colors', '@media (inverted-colors: inverted)')

    matchVariant(
      'nth',
      (value) => {
        return `&:nth-child(${value})`
      },
      {
        values: {
          1: '1',
          2: '2',
          3: '3'
        }
      }
    )
  },
  {
    theme: {
      tabSize: {
        1: '1',
        2: '2',
        4: '4',
        8: '8'
      }
    }
  }
)

const withOptionsPlugin = plugin.withOptions(
  function () {
    return function ({ addComponents }) {
      addComponents({
        '.aaa': {
          color: 'red'
          // ...
        }
      })
    }
  },
  function () {
    return {
      theme: {
        extend: {
          colors: {
            primary: 'rgba(var(--color-primary), <alpha-value>)'
          }
        }
      }
    }
  }
)

const throwErrorPlugin = plugin(() => {
  throw new Error('error')
})

const rawPlugin: PluginCreator = ({ addUtilities }) => {
  addUtilities({
    '.content-auto': {
      'content-visibility': 'auto'
    }
  })
}

describe('index', () => {
  let api: PluginAPI
  beforeEach(() => {
    api = {
      addBase: vi.fn(),
      addComponents: vi.fn(),
      addUtilities: vi.fn(),
      addVariant: vi.fn(),

      matchComponents: vi.fn(),
      e: vi.fn(),
      matchUtilities: vi.fn(),
      corePlugins: vi.fn(),
      // @ts-ignore
      config: vi.fn(),
      // @ts-ignore
      theme: vi.fn(),
      // @ts-ignore
      matchVariant: vi.fn()
    }
  })
  it('normal register plugins', () => {
    const allPlugins = [utilitiesPlugin, componentsPlugin, basePlugin, variants, withOptionsPlugin({})]
    for (const x of allPlugins) x.handler(api)
    for (const [key, fn] of Object.entries(api)) {
      const mockFn = fn as Mock<any, any>
      const called = mockFn.mock.calls.length > 0
      if (['addBase', 'addComponents', 'addUtilities', 'addVariant', 'matchUtilities', 'theme', 'matchVariant'].includes(key)) {
        expect(called).toBe(true)
      } else {
        // console.log(key)
        expect(called).toBe(false)
      }
    }
  })

  it('composePlugins plugins case 0', () => {
    const allPlugins = composePlugins([utilitiesPlugin, componentsPlugin, basePlugin, variants, withOptionsPlugin({}), rawPlugin])
    allPlugins?.({})?.handler(api)
    for (const [key, fn] of Object.entries(api)) {
      const mockFn = fn as Mock<any, any>
      const called = mockFn.mock.calls.length > 0
      if (['addBase', 'addComponents', 'addUtilities', 'addVariant', 'matchUtilities', 'theme', 'matchVariant'].includes(key)) {
        expect(called).toBe(true)
      } else {
        // console.log(key)
        expect(called).toBe(false)
      }
    }
  })
  it('composePlugins plugins case 1', () => {
    const allPlugins = composePlugins([utilitiesPlugin, componentsPlugin, basePlugin, variants, withOptionsPlugin, rawPlugin])
    allPlugins?.({})?.handler(api)
    for (const [key, fn] of Object.entries(api)) {
      const mockFn = fn as Mock<any, any>
      const called = mockFn.mock.calls.length > 0
      if (['addBase', 'addComponents', 'addUtilities', 'addVariant', 'matchUtilities', 'theme', 'matchVariant'].includes(key)) {
        expect(called).toBe(true)
      } else {
        // console.log(key)
        expect(called).toBe(false)
      }
    }
  })
  it('composePlugins plugins case 2', () => {
    const allPlugins = composePlugins(utilitiesPlugin, componentsPlugin, basePlugin, variants, withOptionsPlugin, rawPlugin)
    allPlugins?.({})?.handler(api)
    for (const [key, fn] of Object.entries(api)) {
      const mockFn = fn as Mock<any, any>
      const called = mockFn.mock.calls.length > 0
      if (['addBase', 'addComponents', 'addUtilities', 'addVariant', 'matchUtilities', 'theme', 'matchVariant'].includes(key)) {
        expect(called).toBe(true)
      } else {
        // console.log(key)
        expect(called).toBe(false)
      }
    }
  })

  it('throw error plugin', () => {
    const allPlugins = composePlugins(throwErrorPlugin)

    expect(() => {
      allPlugins?.({})?.handler(api)
    }).not.toThrow()
  })

  it('getCss normal', async () => {
    const raw = [
      'prose lg:prose-xl',
      `<select class="px-4 py-3 rounded-full">
    <!-- ... -->
  </select>`,
      '<input type="checkbox" class="rounded text-pink-500" />',
      `<div class="aspect-w-16 aspect-h-9">
      <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    </div>`,
      `<div class="@container">
    <div class="@lg:text-sky-400">
      <!-- ... -->
    </div>
  </div>`
    ].join('\n')
    const { css } = await getCss({
      content: [
        {
          raw
        }
      ],
      plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/container-queries')],
      corePlugins: {
        preflight: false
      }
    })
    expect(css).matchSnapshot()

    const { css: _css } = await getCss({
      content: [
        {
          raw
        }
      ],
      plugins: [composePlugins(require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio'), require('@tailwindcss/container-queries'))],
      corePlugins: {
        preflight: false
      }
    })
    expect(css).toBe(_css)
  })

  it('prefix', async () => {
    const raw = 'ice-card ice-flex'
    const { css } = await getCss({
      content: [
        {
          raw
        }
      ],
      corePlugins: {
        preflight: false
      }
    })
    expect(css).not.toContain('ice-card')
    expect(css).not.toContain('ice-flex')

    const { css: css0 } = await getCss({
      prefix: 'ice-',
      content: [
        {
          raw
        }
      ],
      corePlugins: {
        preflight: false
      }
    })
    expect(css0).not.toContain('ice-card')
    expect(css0).toContain('ice-flex')

    const { css: css1 } = await getCss({
      prefix: 'ice-',
      content: [
        {
          raw
        }
      ],
      corePlugins: {
        preflight: false
      },
      plugins: [
        plugin(({ addComponents }) => {
          addComponents([
            {
              '.card': {
                padding: '100px'
              }
            }
          ])
        })
      ]
    })
    expect(css1).toContain('ice-card')
    expect(css1).toContain('ice-flex')

    const { css: css2 } = await getCss({
      prefix: 'ice-',
      content: [
        {
          raw: raw + ' ice-tw-card'
        }
      ],
      corePlugins: {
        preflight: false
      },
      plugins: [
        plugin(({ addComponents }) => {
          addComponents([
            {
              '.tw-card': {
                padding: '100px'
              }
            }
          ])
        })
      ]
    })
    expect(css2).not.toContain('ice-card')
    expect(css2).toContain('ice-tw-card')
    expect(css2).toContain('ice-flex')
  })
})
