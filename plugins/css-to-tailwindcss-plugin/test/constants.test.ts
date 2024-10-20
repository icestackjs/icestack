import fs from 'node:fs'
import path from 'node:path'
import { version } from '@/constants'

describe('constants', () => {
  it('version', () => {
    expect(JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf8')).version === version).toBe(true)
  })
})
