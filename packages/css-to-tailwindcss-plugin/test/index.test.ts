import fs from 'node:fs'
import { fixturesResolve } from './utils'
import { createContext } from '@/core'

describe('index', () => {
  it('default', async () => {
    const ctx = createContext()
    await ctx.process(fixturesResolve('index.scss'))
    const code = ctx.generate()
    fs.writeFileSync(fixturesResolve('index.js'), code, 'utf8')
  })
})
