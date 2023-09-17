// import fs from 'node:fs'
import fsp from 'node:fs/promises'
import pathLib from 'node:path'
import postcss from 'postcss'
import postcssJs from 'postcss-js'
import { defu } from 'defu'
import type { AcceptedPlugin, ProcessOptions, Root } from 'postcss'
export type SharedOption = {
  plugins?: AcceptedPlugin[]
  processOptions?: ProcessOptions
}

export type RawCssInput = {
  css: string
} & SharedOption

export type CssFilePathInput = {
  path: string
} & SharedOption

export type UserDefinedOption = RawCssInput | CssFilePathInput

function tryLoadSass() {
  return import('sass')
}

export function createContext(options: UserDefinedOption) {
  const { plugins, processOptions, css, path } = defu<Partial<RawCssInput & CssFilePathInput>, Partial<UserDefinedOption>[]>(options, {
    plugins: [],
    processOptions: {
      from: undefined
    }
  })
  return {
    async getCss(): Promise<string> {
      if (css !== undefined) {
        return css
      }
      if (path !== undefined) {
        const extname = pathLib.extname(path)
        const rawCss = await fsp.readFile(path, 'utf8')
        return rawCss
      }
      throw new TypeError('css or path option should be pass!')
    },
    // getCssSync(): string {
    //   if (css !== undefined) {
    //     return css
    //   }
    //   if (path !== undefined) {
    //     const extname = pathLib.extname(path)
    //     const rawCss = fs.readFileSync(path, 'utf8')
    //     return rawCss
    //   }
    //   throw new TypeError('css or path option should be pass!')
    // },
    processOptions,
    plugins
  }
}

export async function css2js(options: UserDefinedOption) {
  const { plugins, getCss, processOptions } = createContext(options)
  const css = await getCss()
  // @ts-ignore
  const { root } = await postcss(plugins).process(css, processOptions)

  return postcssJs.objectify(root as Root)
}

// export function css2jsSync(options: UserDefinedOption) {
//   const { plugins, getCssSync, processOptions } = createContext(options)
//   const css = getCssSync()
//   // @ts-ignore
//   const { root } = postcss(plugins).process(css, processOptions)

//   return postcssJs.objectify(root as Root)
// }
