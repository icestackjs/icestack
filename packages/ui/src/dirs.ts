import path from 'node:path'
import { pkgName } from './constants'

const rootDir = path.dirname(require.resolve(`${pkgName}/package.json`))
const assetsDir = path.resolve(rootDir, 'assets')
const scssDir = path.resolve(rootDir, 'scss')
const jsDir = path.resolve(assetsDir, 'js')
const cssDir = path.resolve(assetsDir, 'css')
const cssResolvedDir = path.resolve(assetsDir, 'css-resolved')
const pluginsDir = path.resolve(assetsDir, 'plugins')

const scssTemplate = path.resolve(scssDir, 't.scss')

function resolveCssDir(dir?: string) {
  return dir ? path.resolve(dir, 'css') : cssDir
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
  return cssPath.replace(/scss$/, 'css')
}

function getCssResolvedPath(relPath: string, dir?: string) {
  const targetCssDir = resolveCssResolvedDir(dir)
  const jsPath = path.resolve(targetCssDir, relPath)
  return jsPath.replace(/scss$/, 'css')
}

function getJsPath(relPath: string, dir?: string) {
  const targetJsDir = resolveJsDir(dir)
  const jsPath = path.resolve(targetJsDir, relPath)
  return jsPath.replace(/scss$/, 'js')
}

function getPluginsPath(relPath: string, dir?: string) {
  const targetJsDir = dir ? path.resolve(dir, 'js') : pluginsDir
  const jsPath = path.resolve(targetJsDir, relPath)
  return jsPath.replace(/scss$/, 'js')
}

export {
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
  scssTemplate
}
