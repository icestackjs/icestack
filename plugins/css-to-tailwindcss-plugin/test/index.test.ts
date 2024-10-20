import fs from 'node:fs'
import { createContext } from '@/core'
import { fixturesResolve } from './utils'

describe('index', () => {
  it('default', async () => {
    const ctx = createContext()
    await ctx.process(fixturesResolve('index.scss'))
    const code = ctx.generate()
    fs.writeFileSync(fixturesResolve('index.js'), code, 'utf8')
  })
})
