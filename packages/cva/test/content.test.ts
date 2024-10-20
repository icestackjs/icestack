import { createTailwindcssContent, removeAllComponents } from '@/content'

describe('content', () => {
  it('default all component', () => {
    expect(createTailwindcssContent()).toMatchSnapshot()
  })

  it('add prefix to all component', () => {
    expect(
      createTailwindcssContent({
        prefix: 'ice-',
      }),
    ).toMatchSnapshot()
  })

  it('some components', () => {
    expect(
      createTailwindcssContent({
        components: {
          ...removeAllComponents,
          tooltip: true,
        },
        // prefix: 'ice-'
      }),
    ).toMatchSnapshot()
  })

  it('some components add preifx', () => {
    expect(
      createTailwindcssContent({
        components: {
          ...removeAllComponents,
          tooltip: true,
        },
        prefix: 'ice-',
      }),
    ).toMatchSnapshot()
  })
})
