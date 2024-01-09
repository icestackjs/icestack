import path from 'node:path'

export function createResolveDir(base: string) {
  const rootDir = path.dirname(require.resolve(`${base}/package.json`))
  const assetsDir = path.resolve(rootDir, 'assets')
  const scssDir = path.resolve(assetsDir, 'scss')
  const jsDir = path.resolve(assetsDir, 'js')
  const cssDir = path.resolve(assetsDir, 'css')
  const cssResolvedDir = path.resolve(assetsDir, 'css-resolved')
  const pluginsDir = path.resolve(assetsDir, 'plugins')

  function resolveCssDir(dir?: string) {
    return dir ? path.resolve(dir, 'css') : cssDir
  }
  function resolveScssDir(dir?: string) {
    return dir ? path.resolve(dir, 'scss') : cssDir
  }

  function resolveCssResolvedDir(dir?: string) {
    return dir ? path.resolve(dir, 'css-resolved') : cssResolvedDir
  }

  function resolveJsDir(dir?: string) {
    return dir ? path.resolve(dir, 'js') : jsDir
  }

  function getCssPath(relPath: string, dir?: string) {
    const targetCssDir = resolveCssDir(dir)
    const cssPath = path.resolve(targetCssDir, relPath)
    return cssPath + '.css'
  }

  function getScssPath(relPath: string, dir?: string) {
    const targetCssDir = resolveScssDir(dir)
    const cssPath = path.resolve(targetCssDir, relPath)
    return cssPath + '.scss'
  }

  function getCssResolvedPath(relPath: string, dir?: string) {
    const targetCssDir = resolveCssResolvedDir(dir)
    const p = path.resolve(targetCssDir, relPath)
    return p + '.css'
  }

  function getJsPath(relPath: string, dir?: string) {
    const targetJsDir = resolveJsDir(dir)
    const jsPath = path.resolve(targetJsDir, relPath)
    return jsPath + '.cjs'
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
    getScssPath
  }
}
