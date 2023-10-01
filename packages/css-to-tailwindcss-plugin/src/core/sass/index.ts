import type { Options, StringOptions } from 'sass'

export function tryLoadSass() {
  return import('sass')
}
export function tryLoadSassSync() {
  return require('sass')
}

export function isExtSassFile(extname: string) {
  return extname === '.scss' || extname === '.sass'
}

export async function sassCompile(path: string, sassOptions?: Options<'sync'>) {
  const { compile } = await tryLoadSass()
  const { css } = compile(path, sassOptions)
  return css
}

export function sassCompileSync(path: string, sassOptions?: Options<'sync'>) {
  const { compile } = tryLoadSassSync()
  const { css } = compile(path, sassOptions)
  return css
}

export async function sassCompileString(code: string, sassOptions?: StringOptions<'sync'>) {
  const { compileString } = await tryLoadSass()
  const { css } = compileString(code, sassOptions)
  return css
}
