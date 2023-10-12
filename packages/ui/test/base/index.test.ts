import path from 'node:path'
import { compileScss } from '@/sass'
import { scssDir } from '@/dirs'

export function resolve(filename: string) {
  return path.resolve(scssDir, 'base', filename + '.scss')
}

describe('base', () => {
  it('snap', async () => {
    const css = await compileScss(resolve('index'))
    expect(css).toMatchSnapshot()
  })
})
