import { createDefaultTailwindcssExtends, getCodegenDefaults, getDefaultBase, injectSchema, sharedExtraColors, sharedExtraVars } from '@/defaults'

describe('defaults', () => {
  describe('shared vars', () => {
    it('sharedExtraColors', () => {
      expect(sharedExtraColors).toMatchSnapshot()
    })

    it('sharedExtraVars', () => {
      expect(sharedExtraVars).toMatchSnapshot()
    })
  })

  describe('getDefaultBase', () => {
    it('default', () => {
      const res = getDefaultBase()
      expect(res.themes?.light).toBeTruthy()
      expect(res.themes?.dark).toBeTruthy()
      expect(res).toMatchSnapshot()
    })

    it('mode none', () => {
      const res = getDefaultBase({
        mode: 'none',
        dryRun: true
      })
      expect(res.themes?.light).toBeFalsy()
      expect(res.themes?.dark).toBeFalsy()
      expect(res).toMatchSnapshot()
    })

    it('light theme false', () => {
      const res = getDefaultBase({
        dryRun: true,
        base: {
          themes: {
            light: false
          }
        }
      })
      expect(res.themes?.light).toBeFalsy()
      expect(res.themes?.dark).toBeTruthy()
      expect(res).toMatchSnapshot()
    })
  })

  describe('createDefaultTailwindcssExtends', () => {
    it('default', () => {
      expect(createDefaultTailwindcssExtends()).toMatchSnapshot()
    })

    it('custom varPrefix', () => {
      expect(createDefaultTailwindcssExtends({ varPrefix: '--' })).toMatchSnapshot()
    })
  })

  describe('getCodegenDefaults', () => {
    it('default', () => {
      expect(getCodegenDefaults()).toMatchSnapshot()
    })

    it('mode none', () => {
      expect(
        getCodegenDefaults({
          mode: 'none',
          dryRun: true
        })
      ).toMatchSnapshot()
    })
  })

  describe('injectSchema', () => {
    it('default', () => {
      expect(injectSchema({})).toMatchSnapshot()
    })

    it('injectSchema button', () => {
      expect(
        injectSchema({
          button: {}
        })
      ).toMatchSnapshot()
    })

    it('injectSchema global mode none', () => {
      expect(
        injectSchema(
          {
            button: {}
          },
          {
            mode: 'none',
            dryRun: true
          }
        )
      ).toMatchSnapshot()
    })

    it('injectSchema global mode none and inner preset', () => {
      expect(
        injectSchema(
          {},
          {
            mode: 'none',
            dryRun: true,
            components: {
              button: {
                mode: 'preset',
                schema: () => {
                  return {
                    defaults: {}
                  }
                }
              }
            }
          }
        )
      ).toMatchSnapshot()
    })
  })
})
