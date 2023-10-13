import path from 'node:path'
import sassTrue from 'sass-true'

describe('sass', () => {
  it('scss', () => {
    const sassFile = path.join(__dirname, 'sass.test.scss')
    sassTrue.runSass({ describe, it }, sassFile)
  })
})
