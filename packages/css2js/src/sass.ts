import { RawCssInput } from './types'

export function tryLoadSass() {
  return import('sass')
}

export function isExtSassFile(extname: string) {
  return extname === '.scss' || extname === '.sass'
}

export function isLangSass(lang: RawCssInput['lang']) {
  return lang === 'scss' || lang === 'sass'
}
