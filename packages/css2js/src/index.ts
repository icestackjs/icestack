import postcss from 'postcss'
import postcssJs from 'postcss-js'
import { defu } from 'defu'
import type { AcceptedPlugin, ProcessOptions, Root } from 'postcss'

export interface UserDefinedOption {
  css: string
  plugins?: AcceptedPlugin[]
  processOptions?: ProcessOptions
}

export function getOption(options: UserDefinedOption) {
  return defu<UserDefinedOption, Partial<UserDefinedOption>[]>(options, {
    plugins: [],
    processOptions: {
      from: undefined
    }
  })
}

export async function css2js(options: UserDefinedOption) {
  const { plugins, css, processOptions } = getOption(options)
  // @ts-ignore
  const { root } = await postcss(plugins).process(css, processOptions)

  return postcssJs.objectify(root as Root)
}

export function css2jsSync(options: UserDefinedOption) {
  const { plugins, css, processOptions } = getOption(options)
  // @ts-ignore
  const { root } = postcss(plugins).process(css, processOptions)

  return postcssJs.objectify(root as Root)
}
