import { load } from 'cheerio'
import MagicString from 'magic-string'

describe('cheerio', () => {
  it('remove data-[]', () => {
    const testCase = `
    <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div
        class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
        data-svelte-h="svelte-q6ngjl"
      >
        <span class="font-mono text-5xl countdown"><span style="--value: 15"></span></span>
        days
      </div>
      <div
        class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
        data-svelte-h="svelte-5ib19g"
      >
        <span class="font-mono text-5xl countdown"><span style="--value: 10"></span></span>
        hours
      </div>
      <div
        class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
        data-svelte-h="svelte-1h6z4l0"
      >
        <span class="font-mono text-5xl countdown"><span style="--value: 24"></span></span>
        min
      </div>
      <div class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
        <span class="font-mono text-5xl countdown"><span style="--value: 59"></span></span>
        sec
      </div>
    </div>
    
    `
    const s = new MagicString(testCase)
    // ('[data-svelte-h]').removeAttr('data-svelte-h')
    const $ = load(testCase)
    const res = $('[data-svelte-h]').map((i, el) => {
      const m = $(el)
      m.removeAttr('data-svelte-h')
      return m.html()
    })
    expect(res.toArray()).toMatchSnapshot('inner html')
    s.replaceAll(/data-svelte-h="[\w-]+"/g, '')
    expect(s.toString()).toMatchSnapshot('result')
    // expect($.html()).toMatchSnapshot('root')
  })
})
