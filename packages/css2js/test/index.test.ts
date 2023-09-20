import fs from 'node:fs/promises'
import path from 'node:path'
import { compileString, compile } from '@/index'

const fixturesPath = path.resolve(__dirname, 'fixtures')

function resolve(name: string) {
  return path.resolve(fixturesPath, name)
}

function getCase(name: string) {
  return fs.readFile(resolve(name), 'utf8')
}
describe('index', () => {
  it('css2js inline code case', async () => {
    // inline
    const css = '.a{color:red;}'
    const expected = {
      '.a': {
        color: 'red'
      }
    }

    expect(
      await compileString({
        css
      })
    ).toEqual(expected)

    expect(
      await compileString({
        css: await getCase('case0.css')
      })
    ).toEqual(expected)

    expect(
      await compileString({
        css: await getCase('case0.scss')
      })
    ).toEqual(expected)
  })

  it('css2js path', async () => {
    const expected = {
      '.a': {
        color: 'red'
      }
    }

    expect(
      await compile({
        path: resolve('case0.css')
      })
    ).toEqual(expected)

    expect(
      await compile({
        path: resolve('case0.scss')
      })
    ).toEqual(expected)
  })

  it('css2js path Variables case', async () => {
    expect(
      await compile({
        path: resolve('variables.css')
      })
    ).toEqual(
      await compile({
        path: resolve('variables.scss')
      })
    )
  })

  it('css2js path Nesting case', async () => {
    expect(
      await compile({
        path: resolve('nesting.css')
      })
    ).toEqual(
      await compile({
        path: resolve('nesting.scss')
      })
    )
  })

  // 不能使用 compileString 否则会破坏 ModulesModules
  it('css2js path Modules case', async () => {
    expect(
      await compile({
        path: resolve('styles.css')
      })
    ).toEqual(
      await compile({
        path: resolve('styles.scss')
      })
    )
  })

  it('css2js path Mixins case', async () => {
    expect(
      await compile({
        path: resolve('mixins.css')
      })
    ).toEqual(
      await compile({
        path: resolve('mixins.scss')
      })
    )
  })

  it('css2js path Extend/Inheritance case', async () => {
    const obj = await compile({
      path: resolve('extend.scss')
    })
    expect(obj).toEqual(
      await compile({
        path: resolve('extend.css')
      })
    )
    expect(obj).toMatchSnapshot()
  })

  it('css2js path OperatorsOperators case', async () => {
    const obj = await compile({
      path: resolve('math.scss')
    })
    expect(obj).toEqual(
      await compile({
        path: resolve('math.css')
      })
    )
    expect(obj).toMatchSnapshot()
  })
})
