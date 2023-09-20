/* eslint-disable no-useless-catch */
// import fs from 'node:fs'
import fsp from 'node:fs/promises'
import pathLib from 'node:path'
import postcss, { type Root } from 'postcss'
import postcssJs from 'postcss-js'
import { defu } from 'defu'
import { isLangSass, tryLoadSass, isExtSassFile } from './sass'
import { UserDefinedOption, RawCssInput, CssFilePathInput } from './types'

export function createContext(options: UserDefinedOption) {
  const { plugins, processOptions, css, path, sassOptions, lang } = defu<Partial<RawCssInput & CssFilePathInput>, Partial<UserDefinedOption>[]>(options, {
    plugins: [],
    processOptions: {
      from: undefined
    }
  })
  return {
    async getCss(): Promise<postcssJs.CssInJs | void> {
      let rawSource: string
      if (css !== undefined) {
        if (isLangSass(lang)) {
          try {
            const { compileString } = await tryLoadSass()
            const { css: resultCss } = compileString(css, sassOptions)
            rawSource = resultCss
          } catch (error) {
            throw error
            // console.error(error)
            // throw new Error(`${path} skipped! you should install \`sass\` first!`)
          }
        } else {
          rawSource = css
        }
      }
      if (path !== undefined) {
        const extname = pathLib.extname(path)
        if (isExtSassFile(extname)) {
          try {
            const { compile } = await tryLoadSass()
            const { css } = compile(path, sassOptions)
            rawSource = css
          } catch (error) {
            // console.error(error)
            throw error // new Error(`${path} skipped! you should install \`sass\` first!`)
          }
        } else {
          const rawCss = await fsp.readFile(path, 'utf8')
          rawSource = rawCss
        }
      }
      // @ts-ignore
      const { root } = await postcss(plugins).process(rawSource, processOptions)

      return postcssJs.objectify(root as Root)
    },
    processOptions,
    plugins
  }
}

export function compileString(options: RawCssInput) {
  return createContext(options).getCss()
}

export function compile(options: CssFilePathInput) {
  return createContext(options).getCss()
}
