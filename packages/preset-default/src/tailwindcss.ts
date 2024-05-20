import { defaultVarPrefix } from '@icestack/shared/constants'
import type { Config } from 'tailwindcss'

export function createDefaultTailwindcssExtends(opts: { varPrefix?: string } = {}): Config['theme'] {
  const { varPrefix = defaultVarPrefix } = opts
  return {
    borderRadius: {
      box: `var(${varPrefix}rounded-box, 1rem)`,
      btn: `var(${varPrefix}rounded-btn, 0.5rem)`,
      badge: `var(${varPrefix}rounded-badge, 1.9rem)`,
    },
    minHeight: {
      6: '1.5rem',
      8: '2rem',
      12: '3rem',
      16: '4rem',
    },
    lineHeight: {
      1: '0.25rem',
      2: '0.5rem',
    },
  }
}
