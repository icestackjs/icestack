import type { Config } from '@/index'
import { removeDefaultComponents } from '@/components'
import { createContext } from '@/index'

describe('presets merge', () => {
  it('merge case 0', async () => {
    const options: Config = {
      // mode: 'none',
      components: {
        ...removeDefaultComponents,
        xxx: {},
      },
      dryRun: true,
      presets: [
        {
          components: {
            xxx: {
              selector: '.xxx',
              extend: ({ selector }) => {
                return `${selector}{
                  @apply bg-green-500;
                  @apply text-sky-500 #{!important};
                  border-width:var(--ee-bw);
                  font-size: 12px;
                }`
              },
              schema: ({ selector }) => {
                return {
                  selector,
                  defaults: {
                    base: `${selector}{
                      @apply bg-red-500;
                      @apply text-blue-500 #{!important};
                      border-width:var(--bw);
                    }`,
                  },
                }
              },
            },
          },
        },
      ],
      // outdir
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('extend case 0', async () => {
    const options: Config = {
      // mode: 'none',
      components: {
        ...removeDefaultComponents,
        xxx: {},
      },
      dryRun: true,
      presets: [
        {
          components: {
            xxx: {
              selector: '.xxx',
              extend: ({ selector }) => {
                return {
                  base: `${selector}{
                    @apply bg-green-500;
                    @apply text-sky-500 #{!important};
                    border-width:var(--ee-bw);
                    font-size: 12px;
                  }`,
                }
              },
              schema: ({ selector }) => {
                return {
                  selector,
                  defaults: {
                    base: `${selector}{
                      @apply bg-red-500;
                      @apply text-blue-500 #{!important};
                      border-width:var(--bw);
                    }`,
                  },
                }
              },
            },
          },
        },
      ],
      // outdir
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('override case 0', async () => {
    const options: Config = {
      // mode: 'none',
      components: {
        ...removeDefaultComponents,
        xxx: {},
      },
      dryRun: true,
      presets: [
        {
          components: {
            xxx: {
              selector: '.xxx',
              override: ({ selector }) => {
                return {
                  base: `${selector}{
                    @apply bg-green-500;
                    @apply text-sky-500 #{!important};
                    border-width:var(--ee-bw);
                    font-size: 12px;
                  }`,
                }
              },
              schema: ({ selector }) => {
                return {
                  selector,
                  defaults: {
                    base: `${selector}{
                      @apply bg-red-500;
                      @apply text-blue-500 #{!important};
                      border-width:var(--bw);
                    }`,
                  },
                }
              },
            },
          },
        },
      ],
      // outdir
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('extend case 1', async () => {
    const options: Config = {
      // mode: 'none',
      components: {
        ...removeDefaultComponents,
        xxx: {
          extend: [
            ({ selector }) => {
              return {
                base: `${selector}{
                @apply bg-green-900 m-2;
                @apply text-sky-900 #{!important};
                border-width:var(--xx-ee-bw);
                font-size: 16px;
              }`,
              }
            },
          ],
        },
      },
      dryRun: true,
      presets: [
        {
          components: {
            xxx: {
              selector: '.xxx',
              extend: ({ selector }) => {
                return {
                  base: `${selector}{
                    @apply bg-green-500 m-1;
                    @apply text-sky-500 #{!important};
                    border-width:var(--ee-bw);
                    font-size: 12px;
                  }`,
                }
              },
              schema: ({ selector }) => {
                return {
                  selector,
                  defaults: {
                    base: `${selector}{
                      @apply bg-red-500;
                      @apply text-blue-500 #{!important};
                      border-width:var(--bw);
                    }`,
                  },
                }
              },
            },
          },
        },
      ],
      // outdir
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })

  it('override case 1', async () => {
    const options: Config = {
      // mode: 'none',
      components: {
        ...removeDefaultComponents,
        xxx: {
          override: [
            ({ selector }) => {
              return {
                base: `${selector}{
                @apply bg-green-900;
                @apply text-sky-900 #{!important};
                border-width:var(--xx-ee-bw);
                font-size: 16px;
              }`,
              }
            },
          ],
        },
      },
      dryRun: true,
      presets: [
        {
          components: {
            xxx: {
              selector: '.xxx',
              override: ({ selector }) => {
                return {
                  base: `${selector}{
                    @apply bg-green-500;
                    @apply text-sky-500 #{!important};
                    border-width:var(--ee-bw);
                    font-size: 12px;
                  }`,
                }
              },
              schema: ({ selector }) => {
                return {
                  selector,
                  defaults: {
                    base: `${selector}{
                      @apply bg-red-500;
                      @apply text-blue-500 #{!important};
                      border-width:var(--bw);
                    }`,
                  },
                }
              },
            },
          },
        },
      ],
      // outdir
    }
    const ctx = createContext(options)

    const cssObj = await ctx.buildComponents()
    expect(cssObj).toMatchSnapshot()
  })
})
