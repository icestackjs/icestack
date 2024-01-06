import { createContext } from '@/context'
import { names as componentsNames } from '@/components'
// import { stages } from '@/constants'

describe.each(componentsNames.map((x) => ({ name: x })))('$name', ({ name: componentName }) => {
  const ctx = createContext()
  it(componentName, async () => {
    const res = await ctx.buildComponents([componentName])
    expect(res).toMatchSnapshot()
  })
})
