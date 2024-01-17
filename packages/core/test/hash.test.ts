import hash from 'object-hash'

describe('hash', () => {
  it('case 0', () => {
    expect(hash([])).toMatchSnapshot()
    expect(hash(['1'])).toMatchSnapshot()
    expect(hash(null)).toMatchSnapshot()
  })
})
