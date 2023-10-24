import { IDefaults, Types, expandColorsMap } from './shared'

function generateDefault(typeName: string) {
  return `text-${typeName} [@media(hover:hover)]:hover:text-${typeName}-focus`
}

const colorsMap = expandColorsMap(Types, (cur) => {
  return {
    default: generateDefault(cur)
  }
})

const defaults: IDefaults = {
  styled: {
    focus: 'outline-none',
    focusVisible: {
      css: {
        outline: '2px solid currentColor',
        'outline-offset': '2px'
      }
    }
  }
}

export const options = {
  colors: colorsMap,
  defaults
}
