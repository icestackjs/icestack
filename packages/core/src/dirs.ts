import path from 'node:path'

export function createResolveDir(base: string) {
  const rootDir = path.dirname(require.resolve(`${base}/package.json`))
  const assetsDir = path.resolve(rootDir, 'assets')
  const scssDir = path.resolve(assetsDir, 'scss')
  const jsDir = path.resolve(assetsDir, 'js')
  const cvaDir = path.resolve(assetsDir, 'cva')
  const cssDir = path.resolve(assetsDir, 'css')
  const cssResolvedDir = path.resolve(assetsDir, 'css-resolved')
  const pluginsDir = path.resolve(assetsDir, 'plugins')

  function resolveCssDir(dir?: string) {
    return dir ? path.resolve(dir, 'css') : cssDir
  }
  function resolveScssDir(dir?: string) {
    return dir ? path.resolve(dir, 'scss') : scssDir
  }

  function resolveCssResolvedDir(dir?: string) {
    return dir ? path.resolve(dir, 'css-resolved') : cssResolvedDir
  }

  function resolveJsDir(dir?: string) {
    return dir ? path.resolve(dir, 'js') : jsDir
  }

  function resolveCvaDir(dir?: string) {
    return dir ? path.resolve(dir, 'cva') : cvaDir
  }

  function getCssPath(relPath: string, dir?: string) {
    const cssDir = resolveCssDir(dir)
    const cssPath = path.resolve(cssDir, relPath)
    return cssPath + '.css'
  }

  function getScssPath(relPath: string, dir?: string) {
    const scssDir = resolveScssDir(dir)
    const cssPath = path.resolve(scssDir, relPath)
    return cssPath + '.scss'
  }

  function getCssResolvedPath(relPath: string, dir?: string) {
    const cssDir = resolveCssResolvedDir(dir)
    const cssPath = path.resolve(cssDir, relPath)
    return cssPath + '.css'
  }

  function getJsPath(relPath: string, dir?: string) {
    const targetJsDir = resolveJsDir(dir)
    const jsPath = path.resolve(targetJsDir, relPath)
    return jsPath + '.cjs'
  }

  function getCvaPath(relPath: string, dir?: string, format: string = 'ts') {
    const targetJsDir = resolveJsDir(dir)
    const jsPath = path.resolve(targetJsDir, relPath)
    return jsPath + '.' + format
  }

  function getPluginsPath(relPath: string, dir?: string) {
    const targetJsDir = dir ? path.resolve(dir, 'js') : pluginsDir
    const jsPath = path.resolve(targetJsDir, relPath)
    return jsPath + '.cjs'
  }
  return {
    assetsDir,
    scssDir,
    jsDir,
    cssDir,
    cssResolvedDir,
    pluginsDir,
    getCssPath,
    getJsPath,
    getPluginsPath,
    getCssResolvedPath,
    resolveCssDir,
    resolveCssResolvedDir,
    resolveJsDir,
    getScssPath,
    resolveCvaDir,
    getCvaPath
  }
}
