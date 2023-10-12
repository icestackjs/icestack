import * as sass from 'sass'
import postcss from 'postcss'
import { trimStart } from 'lodash'
import { defaultVarPrefix } from './constants'
import { postcssCustomPropertyPrefixer } from './postcssCustomPropertyPrefixer'
function addVarPrefix(args: sass.Value[]) {
  const varName = args[0].assertString('varName')
  return new sass.SassString(defaultVarPrefix + trimStart(varName.toString(), '-'), {
    quotes: false
  })
}

export const sassOptions = {
  functions: {
    // 'addVarPrefix($varName)': addVarPrefix,
    'avp($varName)': (args: sass.Value[]) => {
      const varName = args[0].assertString('varName')
      return new sass.SassString('--' + trimStart(varName.toString(), '-'), {
        quotes: false
      })
    },
    "var($varName,$default:'')": (args: sass.Value[]) => {
      const str = addVarPrefix(args)
      const defaultValue = args[1].toString()

      const result = defaultValue ? `var(${str.toString()},${defaultValue})` : `var(${str.toString()})`
      return new sass.SassString(result, {
        quotes: false
      })
    }
    // 'var($varName)': (args: Value[]) => {
    //   const str = addVarPrefix(args)
    //   return new sass.SassString(`var(${str.toString()})`, {
    //     quotes: false
    //   })
    // }
  }
}

export async function compileScss(filename: string) {
  const result = sass.compile(filename, sassOptions)
  const { css } = await postcss([
    postcssCustomPropertyPrefixer({
      prefix: defaultVarPrefix.slice(2),
      ignore: (prop) => {
        if (prop.startsWith('--tw-')) {
          return true
        }
      }
    })
  ])
    // @ts-ignore
    .process(result.css, {
      from: undefined
    })
    .async()

  return css
}
